import { debounce, updateRecommendations } from './shared.js';

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    // Prevent the form from reloading the page on submit, allowing the JS code to update the image and description
    event.preventDefault();
    const character = document.getElementById('character-value').value;
    try {
        const response = await fetch(
            `/api/characters/search?name=${character}`
        );
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert the response body as JSON
        const data = await response.json();
        const path = data[0].thumbnail.path;
        const ext = data[0].thumbnail.extension;
        const text = data[0].description;
        const imagePath = path + '.' + ext;

        updateImage(imagePath);
        updateDescription(text);
    } catch (error) {
        console.log(error);
    }
});

searchForm.addEventListener('input', (event) => {
    let input = event.target.value;

    if (input.length > 2) {
        // update search suggestions box
        debounceSearch(input);
    }
});

const updateImage = (imgPath) => {
    try {
        const imgElement = document.getElementById('portrait');
        imgElement.src = imgPath;
        imgElement.alt = 'character portrait';
    } catch (error) {
        console.log(error);
    }
};

const updateDescription = (text) => {
    try {
        const pElement = document.getElementById('description');
        pElement.textContent = text;
    } catch (error) {
        console.log(error);
    }
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
