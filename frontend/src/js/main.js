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
        debounceLog();
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

const debounce = (cb, delay = 1000) => {
    let timeout;

    return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(argument);
        }, delay);
    };
};
// Will convert this to make an API call to get search recommendations for auto-complete
const debounceLog = debounce(() => console.log('Hello'), 1000);
