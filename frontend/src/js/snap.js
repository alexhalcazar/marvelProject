import {
    clearRecommendations,
    invalidSearch,
    debounce,
    updateRecommendations,
    clearCards
} from './shared.js';

const searchForm = document.getElementById('search-data');
const allFilters = document.querySelectorAll('[name^="filter"]');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const card = document.getElementById('character-value').value;
    clearCards();
    try {
        const response = await fetch(`/database/find?card=${card}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            invalidSearch(card);
            throw new Error('Invalid Search Query');
        }
        cardResults(data);
        clearRecommendations();
    } catch (error) {
        console.log(error);
    }
});

searchForm.addEventListener('input', (event) => {
    const input = event.target.value;
    const query = `^${input}`;
    if (input.length > 2) {
        // update search suggestions box
        debounceSearch(query);
    } else {
        clearRecommendations();
    }
});

allFilters.forEach((filter) => {
    filter.addEventListener('change', async () => {
        clearCards();
        getCards();
    });
});

const cardResults = (cardData) => {
    if (cardData.length > 1) {
        for (const data of cardData) {
            displayImage(data);
        }
    } else {
        displayImage(cardData[0]);
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

const getAllFilters = () => {
    const costFilters = [];
    const powerFilters = [];
    const character = document
        .getElementById('character-value')
        .value.toLowerCase();
    const series = document.getElementById('series').value;

    const selections = document.querySelectorAll('[name^="filter"]');
    selections.forEach((filter) => {
        if (filter.name === 'filter-card-cost' && filter.checked) {
            costFilters.push(Number(filter.value));
        }
        if (filter.name === 'filter-card-power' && filter.checked) {
            powerFilters.push(Number(filter.value));
        }
    });

    const filters = createFilterObject(
        costFilters,
        powerFilters,
        character,
        series
    );
    return filters;
};

const createFilterObject = (costs, powers, character, series) => {
    const filterObject = {};
    if (character) {
        filterObject['character'] = '^' + character;
    }
    if (costs.length > 0) {
        filterObject['cost'] = { $in: costs };
    }
    if (powers.length > 0) {
        filterObject['power'] = { $in: powers };
    }
    if (series !== 'all') {
        filterObject['series'] = series;
    }

    return filterObject;
};

const getCards = async () => {
    const query = getAllFilters();
    try {
        const response = await fetch(`/database/find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        const data = await response.json();
        cardResults(data);
        clearRecommendations();
    } catch (error) {
        console.log(error);
    }
};

window.onload = async () => {
    try {
        const response = await fetch(`/database/find?card=`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        cardResults(data);
    } catch (error) {
        console.log('Window onload', error);
    }
};
