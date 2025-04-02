import wordCategories from '../data/wordCategories.json';

export const getCategories = (): string[] => {
    try {
        return ['Random', ...Object.values(wordCategories.categories).map(cat => cat.name)];
    } catch {
        return ['Random'];
    }
};

export const getWordCountForCategory = (categoryName: string): number => {
    if (categoryName === 'Random') {
        return wordCategories.metadata.totalWords;
    }
    try {
        return Object.values(wordCategories.categories)
            .find(cat => cat.name === categoryName)?.count ?? 0;
    } catch {
        return 0;
    }
};

export const getRandomWord = (categoryName: string = 'Random'): string => {
    try {
        if (categoryName === 'Random') {
            const allWords = Object.values(wordCategories.categories)
                .flatMap(category => category.words);
            return allWords[Math.floor(Math.random() * allWords.length)];
        }

        const category = Object.values(wordCategories.categories)
            .find(cat => cat.name === categoryName);
        const words = category?.words ?? [];
        
        if (words.length === 0) {
            throw new Error('No words found');
        }

        return words[Math.floor(Math.random() * words.length)];
    } catch {
        // Fallback to a safe default word if something goes wrong
        return 'happy';
    }
};
