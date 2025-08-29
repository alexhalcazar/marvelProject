import { Link } from 'react-router';
import FeatureSelection from '../../components/FeatureSelection/FeatureSelection';
import SearchButton from '../../components/SearchButton/SearchButton';
import captainAmerica from '../../assets/images/characters/captain-america.jpeg';
import spiderMan from '../../assets/images/characters/spider-man.jpeg';
import ironMan from '../../assets/images/characters/iron-man.jpeg';
import wolverine from '../../assets/images/characters/wolverine.jpeg';
import './Home.css';
import { useEffect, useState } from 'react';
import { getApiUrl } from '../../utils/getAPIUrl';

const Home = () => {
    const [comics, setComics] = useState([]);
    const [events, setEvents] = useState([]);
    const [cards, setCards] = useState([]);

    const apiComicsUrl = '/api/marvel/comics';
    const apiEventsUrl = '/api/marvel/events';
    const randSnapCardsUrl = '/database/cards/random';

    const items = [
        {
            imgPath: captainAmerica,
            alt: 'Captain-America',
            query: 'Captain America',
            id: 1009220
        },
        {
            imgPath: spiderMan,
            alt: 'Spider-Man',
            query: 'Spider-Man (Peter Parker)',
            id: 1009610
        },
        {
            imgPath: ironMan,
            alt: 'Iron-Man',
            query: 'Iron Man',
            id: 1009368
        },
        {
            imgPath: wolverine,
            alt: 'Wolverine',
            query: 'Wolverine',
            id: 1009718
        }
    ];

    const getLatestComics = async () => {
        const latestComics = [];
        try {
            const url = await getApiUrl(`${apiComicsUrl}`);
            const response = await fetch(url);
            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.forEach((item) => {
                const comic = {};
                const { path, extension } = item.thumbnail;
                const imgPath = path + '.' + extension;
                comic['imgPath'] = imgPath;
                comic['alt'] = item.digitalId;
                latestComics.push(comic);
            });
            setComics(latestComics);
        } catch (error) {
            console.error('error fetching data', error);
        }
    };

    const getHomeEvents = async (items) => {
        const events = [];
        //variable to prevent example comics being duplicated
        let comicNumber = 0;
        for (const item of items) {
            try {
                const url = await getApiUrl(
                    `${apiEventsUrl}?id=${encodeURIComponent(item.id)}`
                );
                const response = await fetch(url);
                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const firstComic = data[comicNumber];
                const event = {};
                const { path, extension } = firstComic.thumbnail;
                const imgPath = path + '.' + extension;
                event['imgPath'] = imgPath;
                event['alt'] = item.alt;
                events.push(event);
                comicNumber++;
            } catch (error) {
                console.error('error fetching data', error);
            }
        }
        setEvents(events);
    };

    const getFeaturedCard = async () => {
        const snapCards = [];
        try {
            const url = await getApiUrl(randSnapCardsUrl);
            const response = await fetch(url);
            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error('error fetching data', error);
        }
    };

    useEffect(() => {
        getLatestComics();
        getHomeEvents(items);
        getFeaturedCard();
    }, []);

    return (
        <>
            <FeatureSelection
                header="Welcome to the Marvel Project!"
                paragraph="Explore the Marvel Universe - One Character, Comic, and Card
                    at a Time!"
                items={items}
                page="/characters"
            >
                <Link to="/characters">
                    <SearchButton text="Explore More Characters!" />
                </Link>
            </FeatureSelection>
            <div className="comic-section">
                <FeatureSelection
                    header="Check out the latest Comics!"
                    items={comics}
                    page="/comics"
                    myClass="comics"
                >
                    <Link to="/comics">
                        <SearchButton text="More Comics!" myClass="comics" />
                    </Link>
                </FeatureSelection>
            </div>
            <div className="event-section">
                <FeatureSelection
                    header="Discover Marvel Events!"
                    items={events}
                    page="/events"
                    myClass="events"
                >
                    <Link to="events">
                        <SearchButton text="Other Events" myClass="events" />
                    </Link>
                </FeatureSelection>
            </div>
            <div className="snap-section">
                <FeatureSelection
                    header="Explore Marvel Snap Cards!"
                    items={cards}
                    page="/marvelSnap"
                    myClass="snap"
                >
                    <Link to="/marvelSnap">
                        <SearchButton text="More Cards!" myClass="snap" />
                    </Link>
                </FeatureSelection>
            </div>
        </>
    );
};

export default Home;
