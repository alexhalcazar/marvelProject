import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import SelectionForm from '../../components/SelectForm/SelectForm.jsx';
import debounce from '../../utils/debounce.js';
import { useState, useEffect, useMemo } from 'react';
import { getApiUrl } from '../../utils/getAPIUrl.js';
import arrows from '../../assets/images/icons/upArrow.jpg';
import './MarvelSnap.css';

const MarvelSnap = () => {
    const [character, setCharacter] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('energy');
    const [asc, setAsc] = useState(true);
    const [flipped, setFlipped] = useState(false);

    const snapCardsUrl = '/database/cards';

    const handleClick = async () => {
        const newAsc = !asc;
        setAsc(newAsc);
        setFlipped((prev) => !prev);
        const sortObject = {};
        sortObject[filter] = newAsc ? 1 : -1;
        await fetchAllCards(sortObject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!character) return;
            await fetchCard(character);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        const newFilter = e.target.value;
        setFilter(newFilter);
        const sortObject = {};
        sortObject[newFilter] = asc ? 1 : -1;
        await fetchAllCards(sortObject);
    };

    const handleSuggestionClick = async (suggestion) => {
        setCharacter(suggestion);
        await fetchCard(suggestion);
    };

    const fetchCard = async (character) => {
        try {
            setLoading(true);
            const url = await getApiUrl(`${snapCardsUrl}?card=${character}`);
            const response = await fetch(url);
            if (!response.ok) {
                setSearchSuggestions([]);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const suggestions = data.map((item) => item.name);
            setSearchSuggestions(suggestions);
            setCards(data);
        } catch (error) {
            setSearchSuggestions([]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCards = async (sortObject) => {
        try {
            const url = await getApiUrl(`${snapCardsUrl}?card=`);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sortObject)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.log('Window onload', error);
        }
    };

    useEffect(() => {
        const sortObject = {};
        sortObject[filter] = 1;
        fetchAllCards(sortObject);
    }, []);

    //create the function once
    const debounceSearch = useMemo(() => debounce(fetchCard, 1000), []);

    useEffect(() => {
        if (character.length > 2) {
            debounceSearch(character);
        }
    }, [character]);

    return (
        <>
            <div className="bg">
                <SearchBox
                    header="Search Cards from the Marvel Snap Game"
                    character={character}
                    setCharacter={setCharacter}
                    handleSubmit={handleSubmit}
                    searchSuggestions={searchSuggestions}
                    loading={loading}
                    setLoading={setLoading}
                    handleSuggestionClick={handleSuggestionClick}
                />
                <div className="filter-wrapper">
                    <div className="filter">
                        <SelectionForm handleChange={handleChange} />
                    </div>
                    <img
                        src={arrows}
                        alt="filter-arrows"
                        className={`arrow ${flipped ? 'flipped' : ''}`}
                        onClick={handleClick}
                    ></img>
                </div>
                <div className="card-section">
                    {cards &&
                        cards.map((item, index) => (
                            <img
                                src={item.imgPath}
                                alt={item.character}
                                key={index}
                                className="snap-cards"
                            ></img>
                        ))}
                </div>
            </div>
        </>
    );
};

export default MarvelSnap;
