export const debounce = (cb, delay = 1000) => {
    let timeout;

    return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(argument);
        }, delay);
    };
};

export const updateRecommendations = (list) => {
    const divElement = document.querySelector('.result-box');
    const ulElement = divElement.querySelector('ul');
    // prevent old recommendations from stacking
    ulElement.innerHTML = '';
    list.forEach((item) => {
        const listElement = document.createElement('li');
        listElement.textContent = item;
        listElement.addEventListener('click', () => {
            const searchInput = document.getElementById('character-value');
            searchInput.value = item;
        });
        ulElement.appendChild(listElement);
    });
};

export const clearRecommendations = () => {
    const divElement = document.querySelector('.result-box');
    const ulElement = divElement.querySelector('ul');
    ulElement.innerHTML = '';
};

export const invalidSearch = (query) => {
    clearRecommendations();
    const divElement = document.querySelector('.result-box');
    const ulElement = divElement.querySelector('ul');
    const message = `No matching search for '${query}'`;
    const listElement = document.createElement('li');
    listElement.textContent = message;
    ulElement.appendChild(listElement);
};

export const clearCards = () => {
    const div = document.getElementById('collection-list');
    div.innerHTML = '';
};
