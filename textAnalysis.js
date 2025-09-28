const STOP_WORDS = [
    'a', 'al', 'algo', 'algunas', 'algunos', 'ante', 'antes', 'como', 'con', 'contra', 'cual', 'cuando',
    'de', 'del', 'desde', 'donde', 'durante', 'e', 'el', 'ella', 'ellas', 'ellos', 'en', 'entre', 'era',
    'erais', 'eran', 'eras', 'eres', 'es', 'esa', 'esas', 'ese', 'eso', 'esos', 'esta', 'estaba',
    'estabais', 'estaban', 'estabas', 'estad', 'estada', 'estadas', 'estado', 'estados', 'estamos',
    'estando', 'estar', 'estaremos', 'estará', 'estarán', 'estarás', 'estaré', 'estaréis', 'estaría',
    'estaríais', 'estaríamos', 'estarían', 'estarías', 'estas', 'este', 'estemos', 'esto', 'estos',
    'estoy', 'estuve', 'estuviera', 'estuvierais', 'estuvieran', 'estuvieras', 'estuvieron', 'estuviese',
    'estuviesen', 'estuvieses', 'estuvimos', 'estuviste', 'estuvisteis', 'estuvo', 'está', 'estábamos',
    'estáis', 'están', 'estás', 'esté', 'estéis', 'estén', 'estés', 'fue', 'fuera', 'fuerais', 'fueran',
    'fueras', 'fueron', 'fuese', 'fuesen', 'fueses', 'fui', 'fuimos', 'fuiste', 'fuisteis', 'ha', 'habéis',
    'había', 'habíais', 'habíamos', 'habían', 'habías', 'habida', 'habidas', 'habido', 'habidos', 'habiendo',
    'habremos', 'habrá', 'habrán', 'habrás', 'habré', 'habréis', 'habría', 'habríais', 'habríamos', 'habrían',
    'habrías', 'han', 'has', 'hasta', 'hay', 'haya', 'hayamos', 'hayan', 'hayas', 'hayáis', 'he', 'hemos',
    'hube', 'hubiera', 'hubierais', 'hubieran', 'hubieras', 'hubieron', 'hubiese', 'hubiesen', 'hubieses',
    'hubimos', 'hubiste', 'hubisteis', 'hubo', 'la', 'las', 'le', 'les', 'lo', 'los', 'me', 'mi', 'mis',
    'mucho', 'muchos', 'muy', 'más', 'mí', 'mía', 'mías', 'mío', 'míos', 'nada', 'ni', 'no', 'nos',
    'nosotras', 'nosotros', 'nuestra', 'nuestras', 'nuestro', 'nuestros', 'o', 'os', 'otra', 'otras',
    'otro', 'otros', 'para', 'pero', 'poco', 'por', 'porque', 'que', 'quien', 'quienes', 'qué', 'se',
    'sea', 'seamos', 'sean', 'seas', 'sentid', 'sentida', 'sentidas', 'sentido', 'sentidos', 'seremos',
    'será', 'serán', 'serás', 'seré', 'seréis', 'sería', 'seríais', 'seríamos', 'serían', 'serías',
    'seáis', 'sido', 'siendo', 'sin', 'sobre', 'sois', 'somos', 'son', 'soy', 'su', 'sus', 'suya',
    'suyas', 'suyo', 'suyos', 'sí', 'también', 'tanto', 'te', 'tendremos', 'tendrá', 'tendrán',
    'tendrás', 'tendré', 'tendréis', 'tendría', 'tendríais', 'tendríamos', 'tendrían', 'tendrías',
    'tened', 'tenemos', 'tenga', 'tengamos', 'tengan', 'tengas', 'tengo', 'tengáis', 'tenida', 'tenidas',
    'tenido', 'tenidos', 'teniendo', 'tenéis', 'tenía', 'teníais', 'teníamos', 'tenían', 'tenías',
    'ti', 'tiene', 'tienen', 'tienes', 'todo', 'todos', 'tu', 'tus', 'tuve', 'tuviera', 'tuvierais',
    'tuvieran', 'tuvieras', 'tuvieron', 'tuviese', 'tuviesen', 'tuvieses', 'tuvimos', 'tuviste',
    'tuvisteis', 'tuvo', 'tuya', 'tuyas', 'tuyo', 'tuyos', 'tú', 'un', 'una', 'uno', 'unos', 'vosotras',
    'vosotros', 'vuestra', 'vuestras', 'vuestro', 'vuestros', 'y', 'ya', 'yo', 'él', 'éramos'
];

function cleanText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\sáéíóúüñ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getMostUsedWords(headlines, count = 3) {
    const allText = headlines.join(' ');
    const cleanedText = cleanText(allText);
    const words = cleanedText.split(' ');

    const wordFreq = {};

    words.forEach(word => {
        if (word.length >= 3 && !STOP_WORDS.includes(word)) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });

    return Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, count)
        .map(([word, freq]) => ({ word, count: freq }));
}

function getMostUsedPhrases(headlines, count = 3) {
    const phrases = [];

    headlines.forEach(headline => {
        const cleanedHeadline = cleanText(headline);
        const words = cleanedHeadline.split(' ').filter(word => word.length >= 3);

        for (let i = 0; i < words.length - 1; i++) {
            const phrase = words.slice(i, i + 2).join(' ');
            if (!containsStopWord(phrase)) {
                phrases.push(phrase);
            }

            if (i < words.length - 2) {
                const threeWordPhrase = words.slice(i, i + 3).join(' ');
                if (!containsStopWord(threeWordPhrase)) {
                    phrases.push(threeWordPhrase);
                }
            }
        }
    });

    const phraseFreq = {};
    phrases.forEach(phrase => {
        phraseFreq[phrase] = (phraseFreq[phrase] || 0) + 1;
    });

    const sortedPhrases = Object.entries(phraseFreq)
        .filter(([phrase, freq]) => freq >= 1 && phrase.length > 3)
        .sort(([,a], [,b]) => b - a);

    // Filter out phrases with repeated words from previous phrases
    const uniquePhrases = [];
    const usedWords = new Set();

    for (const [phrase, freq] of sortedPhrases) {
        const phraseWords = phrase.split(' ');
        const hasUsedWord = phraseWords.some(word => usedWords.has(word));

        if (!hasUsedWord && uniquePhrases.length < count) {
            uniquePhrases.push({ phrase, count: freq });
            phraseWords.forEach(word => usedWords.add(word));
        }
    }

    return uniquePhrases;
}

function containsStopWord(phrase) {
    const words = phrase.split(' ');
    return words.some(word => STOP_WORDS.includes(word));
}

function analyzeGroup(group) {
    const mostUsedWords = getMostUsedWords(group.headlines);
    const mostUsedPhrases = getMostUsedPhrases(group.headlines);

    return {
        ...group,
        analysis: {
            mostUsedWords,
            mostUsedPhrases
        }
    };
}

function analyzeAllGroups(groups) {
    const analyzedGroups = groups.map(group => analyzeGroup(group));

    // Generate global summary across all groups
    const allHeadlines = groups.flatMap(group => group.headlines);
    const globalSummary = {
        totalHeadlines: allHeadlines.length,
        totalGroups: groups.length,
        mostUsedWords: getMostUsedWords(allHeadlines, 10),
        mostUsedPhrases: getMostUsedPhrases(allHeadlines, 8)
    };

    return {
        groups: analyzedGroups,
        globalSummary
    };
}

module.exports = { analyzeAllGroups, getMostUsedWords, getMostUsedPhrases };