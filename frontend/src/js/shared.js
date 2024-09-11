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
        ulElement.appendChild(listElement);
    });
};
