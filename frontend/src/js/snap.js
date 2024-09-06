document
    .getElementById('search-data')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const card = document.getElementById('search-bar').value;
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
