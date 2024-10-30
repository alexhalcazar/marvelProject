import {
    clearResults,
    invalidSearch,
    debounce,
    updateRecommendations
} from './shared.js';

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    // prevent the form from reloading the page on submit, allowing the JS code to update the image and description
    event.preventDefault();
    const character = document.getElementById('character-value').value;
    if (!character) {
        return;
    }
    try {
        const response = await fetch(
            `/api/characters/search?name=${character}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // convert the response body as JSON
        const data = await response.json();
        if (data.length === 0) {
            invalidSearch(character);
            throw new Error('Invalid Search Query');
        }
        const path = data[0].thumbnail.path;
        const ext = data[0].thumbnail.extension;
        const text = data[0].description;
        const imagePath = path + '.' + ext;

        updateImage(imagePath);
        updateDescription(text);
        clearResults();
    } catch (error) {
        console.log(error);
    }
});

searchForm.addEventListener('input', (event) => {
    let input = event.target.value;

    if (input.length > 2) {
        // update search suggestions box
        debounceSearch(input);
    } else {
        clearResults();
    }
});

const updateImage = (imgPath) => {
    const imgElement = document.getElementById('portrait');
    imgElement.src = imgPath;
    imgElement.alt = 'character portrait';
};

const updateDescription = (text) => {
    const pElement = document.getElementById('description');
    pElement.textContent = text;
};

const debounceSearch = debounce(async (input) => {
    try {
        const response = await fetch(
            `api/characters/startsWith?string=${input}`
        );
        if (!response) {
            throw new Error(`Http error! status: ${response.status}`);
        } else {
            const searchSuggestions = await response.json();
            updateRecommendations(searchSuggestions);
        }
    } catch (error) {
        console.log(error);
    }
}, 1000);
