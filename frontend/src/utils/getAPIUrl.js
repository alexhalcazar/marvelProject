export const getApiUrl = (path) => {
    const base =
        import.meta.env.MODE === 'development'
            ? ''
            : 'https://phfeaa7t58.execute-api.us-west-1.amazonaws.com';

    return `${base}${path}`;
};
