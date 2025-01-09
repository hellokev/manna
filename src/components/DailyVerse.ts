const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const API_URL = import.meta.env.VITE_BIBLE_API_URL;
const ASV_ID = import.meta.env.VITE_ASV_ID;


const bibleStructure = {
    Genesis: 50,
    Exodus: 40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    Ruth: 4,
    "1 Samuel": 31,
    "2 Samuel": 24,
    "1 Kings": 22,
    "2 Kings": 25,
    "1 Chronicles": 29,
    "2 Chronicles": 36,
    Ezra: 10,
    Nehemiah: 13,
    Esther: 10,
    Job: 42,
    Psalms: 150,
    Proverbs: 31,
    Ecclesiastes: 12,
    "Song of Solomon": 8,
    Isaiah: 66,
    Jeremiah: 52,
    Lamentations: 5,
    Ezekiel: 48,
    Daniel: 12,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
    Acts: 28,
    Romans: 16,
    "1 Corinthians": 16,
    "2 Corinthians": 13,
    Galatians: 6,
    Ephesians: 6,
    Philippians: 4,
    Colossians: 4,
    "1 Thessalonians": 5,
    "2 Thessalonians": 3,
    "1 Timothy": 6,
    "2 Timothy": 4,
    Titus: 3,
    Philemon: 1,
    Hebrews: 13,
    James: 5,
    "1 Peter": 5,
    "2 Peter": 3,
    "1 John": 5,
    "2 John": 1,
    "3 John": 1,
    Jude: 1,
    Revelation: 22,
};

function getRandomVerse() {
    const books = Object.keys(bibleStructure);
    const randomBook = books[Math.floor(Math.random() * books.length)];
    const chapterCount = bibleStructure[randomBook];
    const randomChapter = Math.ceil(Math.random() * chapterCount);

    // Use a placeholder (e.g., max of 150 verses) if you don't have exact verse counts for each chapter
    const randomVerse = Math.ceil(Math.random() * 150);

    return `${randomBook}.${randomChapter}.${randomVerse}`;
}

async function DailyVerse() {
    try {
        const randomReference = getRandomVerse();
        const endpoint = `verses/${randomReference}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;

        const response = await fetch(`${API_URL}/${ASV_ID}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'api-key': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract relevant fields
        const verseData = data?.data;
        if (!verseData) {
            throw new Error("Invalid response format.");
        }

        const verseContent = verseData.content.replace(/<[^>]+>/g, ""); // Remove HTML tags
        const verseReference = verseData.reference;

        console.log(`Verse of the Day: ${verseReference}`);
        console.log(verseContent);

        return {
            reference: verseReference,
            content: verseContent,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Example usage:
DailyVerse().then(data => {
    if (data) {
        console.log('Random Verse:', data);
    }
});
