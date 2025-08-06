let apiUrl = '';

export const getApiUrl = async (path) => {
    const isDev = window.location.port === '5173';
    if (isDev) {
        return path;
    }
    try {
        //used a config.json to deploy to AWS S3
        const res = await fetch('/config');
        const config = await res.json();
        apiUrl = config.apiUrl;
        return `${apiUrl}${path}`;
    } catch (error) {
        console.error(error);
    }
};
