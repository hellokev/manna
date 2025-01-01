const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const API_URL = import.meta.env.VITE_BIBLE_API_URL;
const ASV_ID = import.meta.env.VITE_ASV_ID;

interface Bible {
    id: string,
    name: string,
    abbrievation: string,
}

interface BibleData {
    data: Bible;
}

async function getBibleData(endpoint: string): Promise<BibleData | null> {
    try {
        const response = await fetch(`${API_URL}/${ASV_ID}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'api-key': API_KEY,
            },
        });

        const data: BibleData = await response.json();
        return data;
    } catch(error) {
        console.error('Error fetching data', error);
        return null;
    }

}

export { getBibleData }