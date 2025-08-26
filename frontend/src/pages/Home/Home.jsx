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

    const apiSearchUrl = '/api/marvel/comics';

    const items = [
        {
            image: captainAmerica,
            alt: 'Captain-America',
            query: 'Captain America'
        },
        {
            image: spiderMan,
            alt: 'Spider-Man',
            query: 'Spider-Man (Peter Parker)'
        },
        {
            image: ironMan,
            alt: 'Iron-Man',
            query: 'Iron Man'
        },
        {
            image: wolverine,
            alt: 'Wolverine',
            query: 'Wolverine'
        }
    ];

    const getLatestComics = async () => {
        const latestComics = [];
        try {
            const url = await getApiUrl(`${apiSearchUrl}`);
            const response = await fetch(url);
            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.forEach((item) => {
                const comic = {};
                const { path, extension } = item.thumbnail;
                const image = path + '.' + extension;
                comic['image'] = image;
                comic['alt'] = item.digitalId;
                latestComics.push(comic);
            });
            setComics(latestComics);
        } catch (error) {
            console.error('error fetching data', error);
        }
    };

    useEffect(() => {
        getLatestComics();
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
        </>
    );
};

export default Home;
