import { debounce, updateRecommendations } from './shared.js';

const searchForm = document.getElementById('search-data');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const card = document.getElementById('marvel-search').value;
    const div = document.getElementById('collection-list');
    // clear any old searches
    div.innerHTML = '';

    try {
        const response = await fetch(`/database/find?card=${card}`);
        const data = await response.json();
        cardResults(card, data);
    } catch (error) {
        console.log(error);
    }
});

searchForm.addEventListener('input', (event) => {
    event.preventDefault();
    const input = event.target.value;
    const query = `^${input}`;
    try {
        if (input.length > 2) {
            debounceSearch(query);
        }
    } catch (error) {
        console.log(error);
    }
});

const cardResults = (card, cardData) => {
    try {
        if (!card) {
            for (const data of cardData) {
                displayImage(data);
            }
        } else {
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
    imgElement.width = '300';
    imgElement.height = '300';
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
            console.log('Our card recommendations', cardRecommendations);
            updateRecommendations(cardRecommendations);
        }
    } catch (error) {
        console.log(error);
    }
}, 1000);
