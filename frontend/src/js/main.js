document.getElementById('search-form').addEventListener('submit', async () => {
    const character = document.getElementById('search-bar').value;
    try {
        const response = await fetch(
            `/api/characters/search?name=${character}`
        );
        console.log('Fetch response:', response);
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
