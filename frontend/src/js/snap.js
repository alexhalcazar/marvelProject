import { clearResults, debounce, updateRecommendations } from './shared.js';

const searchForm = document.getElementById('search-data');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const card = document.getElementById('marvel-search').value;
    const div = document.getElementById('collection-list');
    // clear any old searches
    div.innerHTML = '';
    try {
        const response = await fetch(`/database/find?card=${card}`);
        console.log('Response status:', response.status);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Our response data:', data);
        cardResults(card, data);
        clearResults();
    } catch (error) {
        console.log(error);
    }
});

searchForm.addEventListener('input', (event) => {
    const input = event.target.value;
    const query = `^${input}`;
    try {
        if (input.length > 2) {
            // update search suggestions box
            debounceSearch(query);
        } else {
            clearResults();
        }
    } catch (error) {
        console.log(error);
    }
});

const cardResults = (card, cardData) => {
    try {
        if (!card) {
            for (const data of cardData) {
                console.log('Card data:', cardData);
                displayImage(data);
            }
        } else {
            console.log('Card data:', cardData);
            displayImage(cardData[0]);
        }
    } catch (error) {
        console.log(error);
    }
};

const displayImage = (cardData) => {
    const div = document.getElementById('collection-list');
    const imgElement = document.createElement('img');
    imgElement.src = cardData.imgPath;
    imgElement.alt = cardData.character;
    imgElement.className = 'snap-cards';
    div.appendChild(imgElement);
};

const debounceSearch = debounce(async (input) => {
    try {
        const response = await fetch(`/database/find?card=${input}`);

        if (!response) {
            throw new Error(`Http error! status: ${response.status}`);
        } else {
            const searchSuggestions = await response.json();
            const cardRecommendations = [];
            searchSuggestions.forEach((recommendation) => {
                const card = recommendation.character;
                cardRecommendations.push(card);
            });
            updateRecommendations(cardRecommendations);
        }
    } catch (error) {
        console.log(error);
    }
}, 1000);

window.onload = async () => {
    try {
        const response = await fetch(`/database/find?card=`);
        const data = await response.json();
        cardResults(undefined, data);
    } catch (error) {
        console.log(error);
    }
};
