const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const API_URL = import.meta.env.VITE_BIBLE_API_URL;
const ASV_ID = import.meta.env.VITE_ASV_ID;

interface Books {
    id: string,
    name: string,
}

interface BibleData {
    data: Books;
}

export async function getBookData(): Promise<BibleData | null> {
    try {
        const response = await fetch(`${API_URL}/${ASV_ID}/books/?include-chapters=false&include-chapters-and-sections=false`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'api-key': API_KEY,
            },
        });

        const data: BibleData = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error('Error fetching data', error);
        return null;
    }

}