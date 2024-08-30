// When user submits form we will make a fetch call to a specific route
document
    .getElementById('search-data')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const card = document.getElementById('search-bar').value;
        try {
            const response = await fetch(`/database/find?card=${card}`);
            const data = await response.json();
            console.log('Our data', data);
        } catch (error) {
            console.log(error);
        }
    });
