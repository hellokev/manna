import { getBibleData } from './api';

async function fetchBible() {
    const ASV_ID = import.meta.env.VITE_ASV_ID;
    const bibleData = await getBibleData(ASV_ID);

    if (bibleData) {
        console.log('bible data:', bibleData);
    } else {
        console.error('Failed to fetch data.');
    }
}

fetchBible();

export default fetchBible;