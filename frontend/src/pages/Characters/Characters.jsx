import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import debounce from '../../utils/debounce.js';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../../utils/getAPIUrl.js';
import comicBg from '../../assets/images/backgrounds/comic-bg.avif';
import './Characters.css';

const Characters = () => {
    const [character, setCharacter] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [portrait, setPortrait] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [searchParams] = useSearchParams();
    const apiRecommendationUrl = '/api/characters/startsWith';
    const apiSearchUrl = '/api/characters/search';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!character) return;
        await fetchCharacter(character);
    };

    const handleSuggestionClick = async (suggestion) => {
        setCharacter(suggestion);
        await fetchCharacter(suggestion);
    };

    const fetchCharacter = async (character) => {
        try {
            setLoading(true);
            const url = await getApiUrl(
                `${apiSearchUrl}?name=${encodeURIComponent(character)}`
            );
            const response = await fetch(url);
            if (!response.ok) {
                setLoading(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setLoading(false);
            // convert the response body as JSON
            const data = await response.json();
            if (data.length === 0) {
                // invalidSearch(character);
                setSearchSuggestions([]);
                setDescription('');
                throw new Error('Invalid Search Query');
            }
            const path = data[0]?.thumbnail.path;
            const ext = data[0]?.thumbnail.extension;
            const imagePath = path + '.' + ext;
            const description = data[0]?.description;
            setDescription(description);
            setPortrait(imagePath);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSuggestions = async (input) => {
        try {
            setLoading(true);
            const url = await getApiUrl(
                `${apiRecommendationUrl}?string=${encodeURIComponent(input)}`
            );
            const response = await fetch(url);
            if (!response.ok) {
                setSearchSuggestions([]);
                throw new Error(`Http error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setSearchSuggestions(data);
            }
        } catch (error) {
            setSearchSuggestions([]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //create the function once
    const debounceSearch = useMemo(() => debounce(fetchSuggestions, 1000), []);

    useEffect(() => {
        if (character.length > 2) {
            debounceSearch(character);
        }
    }, [character]);

    //default search if coming from a character link from the Home page
    useEffect(() => {
        if (searchParams.get('name')) {
            fetchCharacter(searchParams.get('name'));
        }
    }, []);

    return (
        <>
            <SearchBox
                header="Explore the Marvel Database"
                character={character}
                setCharacter={setCharacter}
                handleSubmit={handleSubmit}
                searchSuggestions={searchSuggestions}
                loading={loading}
                setLoading={setLoading}
                handleSuggestionClick={handleSuggestionClick}
            />
            <div className="character-portrait">
                <img
                    src={comicBg}
                    alt="character-border"
                    className="character-border"
                ></img>
                {portrait && (
                    <img
                        src={portrait}
                        alt={`${character} portrait`}
                        className="portrait"
                    ></img>
                )}
            </div>
            <div className="description">
                {description && <p>{description}</p>}
            </div>
        </>
    );
};

export default Characters;
