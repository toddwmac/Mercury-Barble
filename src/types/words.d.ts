interface WordCategory {
    name: string;
    count: number;
    words: string[];
}

interface WordCategories {
    metadata: {
        totalWords: number;
        lastUpdated: string;
    };
    categories: {
        [key: string]: WordCategory;
    };
}

declare module "*.json" {
    const value: WordCategories;
    export default value;
}
