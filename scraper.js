const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const { SAMPLE_HEADLINES } = require('./sampleData');

const COLOMBIAN_NEWSPAPERS = [
    {
        name: 'El Tiempo',
        url: 'https://www.eltiempo.com',
        headlineSelector: '.title-link, .article-title, h2 a, h3 a, .headline a'
    },
    {
        name: 'El Espectador',
        url: 'https://www.elespectador.com',
        headlineSelector: '.ArticleTitle, .title a, h2 a, h3 a, .headline'
    },
    {
        name: 'El Colombiano',
        url: 'https://www.elcolombiano.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title'
    },
    {
        name: 'Semana',
        url: 'https://www.semana.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title'
    },
    {
        name: 'El Universal',
        url: 'https://www.eluniversal.com.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title'
    },
    {
        name: 'Caracol Radio',
        url: 'https://caracol.com.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'RCN Radio',
        url: 'https://www.rcnradio.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'Noticias RCN',
        url: 'https://www.noticiasrcn.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'Noticias Caracol',
        url: 'https://noticias.caracoltv.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'La República',
        url: 'https://www.larepublica.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'Portafolio',
        url: 'https://www.portafolio.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'El Heraldo',
        url: 'https://www.elheraldo.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'Vanguardia',
        url: 'https://www.vanguardia.com',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'El País',
        url: 'https://www.elpais.com.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    },
    {
        name: 'W Radio',
        url: 'https://www.wradio.com.co',
        headlineSelector: '.title a, h2 a, h3 a, .article-title, .headline'
    }
];

async function scrapeHeadlines() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
    } catch (error) {
        console.log('Puppeteer failed to launch, using sample data for demonstration...');
        return SAMPLE_HEADLINES;
    }

    const allGroups = [];

    for (let i = 0; i < COLOMBIAN_NEWSPAPERS.length; i++) {
        const newspaper = COLOMBIAN_NEWSPAPERS[i];
        console.log(`Scraping ${newspaper.name}...`);

        try {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

            await page.goto(newspaper.url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            await page.waitForTimeout(3000);

            const headlines = await page.evaluate((selector) => {
                const elements = document.querySelectorAll(selector);
                const texts = [];

                elements.forEach(el => {
                    let text = '';
                    if (el.textContent) {
                        text = el.textContent.trim();
                    } else if (el.innerText) {
                        text = el.innerText.trim();
                    }

                    if (text && text.length > 10 && text.length < 200) {
                        texts.push(text);
                    }
                });

                return [...new Set(texts)].slice(0, 20);
            }, newspaper.headlineSelector);

            if (headlines.length > 0) {
                allGroups.push({
                    groupNumber: i + 1,
                    newspaperName: newspaper.name,
                    headlines: headlines,
                    url: newspaper.url
                });
                console.log(`Found ${headlines.length} headlines from ${newspaper.name}`);
            } else {
                console.log(`No headlines found from ${newspaper.name}`);
            }

            await page.close();
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.error(`Error scraping ${newspaper.name}:`, error.message);

            try {
                const fallbackHeadlines = await fallbackScrape(newspaper.url);
                if (fallbackHeadlines.length > 0) {
                    allGroups.push({
                        groupNumber: i + 1,
                        newspaperName: newspaper.name,
                        headlines: fallbackHeadlines,
                        url: newspaper.url
                    });
                    console.log(`Found ${fallbackHeadlines.length} headlines from ${newspaper.name} (fallback)`);
                }
            } catch (fallbackError) {
                console.error(`Fallback scraping also failed for ${newspaper.name}:`, fallbackError.message);
            }
        }
    }

    await browser.close();

    if (allGroups.length === 0) {
        console.log('No headlines scraped, using sample data for demonstration...');
        return SAMPLE_HEADLINES;
    }

    return allGroups;
}

async function fallbackScrape(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const headlines = [];

        $('h1, h2, h3, .title, .headline, [class*="title"], [class*="headline"]').each((i, element) => {
            const text = $(element).text().trim();
            if (text && text.length > 10 && text.length < 200) {
                headlines.push(text);
            }
        });

        return [...new Set(headlines)].slice(0, 15);
    } catch (error) {
        console.error('Fallback scraping failed:', error.message);
        return [];
    }
}

module.exports = { scrapeHeadlines };