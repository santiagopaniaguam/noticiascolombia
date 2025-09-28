const express = require('express');
const path = require('path');
const { scrapeHeadlines } = require('./scraper');
const { analyzeAllGroups } = require('./textAnalysis');

const app = express();
const PORT = process.env.PORT || 44444;

let cachedNews = null;
let lastScrapeTime = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/news', async (req, res) => {
    try {
        const now = new Date();
        const shouldRefresh = !cachedNews || !lastScrapeTime ||
                            (now.getTime() - lastScrapeTime.getTime()) > CACHE_DURATION;

        if (shouldRefresh) {
            console.log('Scraping fresh news data...');

            const scrapedGroups = await scrapeHeadlines();

            if (scrapedGroups.length === 0) {
                return res.status(500).json({
                    error: 'No se pudieron obtener noticias en este momento',
                    timestamp: now.toISOString(),
                    groups: []
                });
            }

            const analysisResult = analyzeAllGroups(scrapedGroups);

            cachedNews = {
                groups: analysisResult.groups,
                globalSummary: analysisResult.globalSummary,
                timestamp: now.toISOString(),
                totalGroups: analysisResult.groups.length,
                totalHeadlines: analysisResult.groups.reduce((sum, group) => sum + group.headlines.length, 0)
            };
            lastScrapeTime = now;

            console.log(`Successfully scraped ${cachedNews.totalHeadlines} headlines from ${cachedNews.totalGroups} sources`);
        } else {
            console.log('Serving cached news data');
        }

        res.json(cachedNews);

    } catch (error) {
        console.error('Error in /api/news:', error);
        res.status(500).json({
            error: 'Error interno del servidor al obtener las noticias',
            message: error.message,
            timestamp: new Date().toISOString(),
            groups: []
        });
    }
});

app.get('/api/news/refresh', async (req, res) => {
    try {
        console.log('Manual refresh requested...');

        cachedNews = null;
        lastScrapeTime = null;

        const scrapedGroups = await scrapeHeadlines();

        if (scrapedGroups.length === 0) {
            return res.status(500).json({
                error: 'No se pudieron obtener noticias en este momento',
                timestamp: new Date().toISOString(),
                groups: []
            });
        }

        const analysisResult = analyzeAllGroups(scrapedGroups);
        const now = new Date();

        cachedNews = {
            groups: analysisResult.groups,
            globalSummary: analysisResult.globalSummary,
            timestamp: now.toISOString(),
            totalGroups: analysisResult.groups.length,
            totalHeadlines: analysisResult.groups.reduce((sum, group) => sum + group.headlines.length, 0)
        };
        lastScrapeTime = now;

        console.log(`Manual refresh completed: ${cachedNews.totalHeadlines} headlines from ${cachedNews.totalGroups} sources`);

        res.json({
            message: 'Noticias actualizadas exitosamente',
            ...cachedNews
        });

    } catch (error) {
        console.error('Error in manual refresh:', error);
        res.status(500).json({
            error: 'Error al actualizar las noticias',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        cacheStatus: {
            hasCachedData: !!cachedNews,
            lastScrapeTime: lastScrapeTime ? lastScrapeTime.toISOString() : null,
            nextRefreshIn: lastScrapeTime ?
                Math.max(0, CACHE_DURATION - (new Date().getTime() - lastScrapeTime.getTime())) : 0
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📰 Colombian News Scraper is ready!`);
    console.log(`🔄 Cache duration: ${CACHE_DURATION / 60000} minutes`);

    setTimeout(async () => {
        console.log('🎯 Preloading news data...');
        try {
            const scrapedGroups = await scrapeHeadlines();
            if (scrapedGroups.length > 0) {
                const analysisResult = analyzeAllGroups(scrapedGroups);
                const now = new Date();
                cachedNews = {
                    groups: analysisResult.groups,
                    globalSummary: analysisResult.globalSummary,
                    timestamp: now.toISOString(),
                    totalGroups: analysisResult.groups.length,
                    totalHeadlines: analysisResult.groups.reduce((sum, group) => sum + group.headlines.length, 0)
                };
                lastScrapeTime = now;
                console.log(`✅ Preloaded ${cachedNews.totalHeadlines} headlines from ${cachedNews.totalGroups} sources`);
            }
        } catch (error) {
            console.error('❌ Error preloading news:', error.message);
        }
    }, 2000);
});