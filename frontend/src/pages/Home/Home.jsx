import FeatureSelection from '../../components/FeatureSelection/FeatureSelection';
import SearchButton from '../../components/SearchButton/SearchButton';
import captainAmerica from '../../assets/images/characters/captain-america.jpeg';
import spiderMan from '../../assets/images/characters/spider-man.jpeg';
import ironMan from '../../assets/images/characters/iron-man.jpeg';
import wolverine from '../../assets/images/characters/wolverine.jpeg';
import './Home.css';

const Home = () => {
    const items = [
        {
            image: captainAmerica,
            alt: 'Captain-America'
        },
        {
            image: spiderMan,
            alt: 'Spider-Man'
        },
        {
            image: ironMan,
            alt: 'Iron-Man'
        },
        {
            image: wolverine,
            alt: 'Wolverine'
        }
    ];

    return (
        <>
            <FeatureSelection
                header="Welcome to the Marvel Project!"
                paragraph="Explore the Marvel Universe - One Character, Comic, and Card
                    at a Time!"
                items={items}
            >
                <SearchButton
                    link="/characters"
                    text="Explore More Characters!"
                />
            </FeatureSelection>
            <div className="comic-section"></div>
        </>
    );
};

export default Home;
