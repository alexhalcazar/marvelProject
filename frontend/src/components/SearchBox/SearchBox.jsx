import magnifyingGlass from '../../assets/images/icons/magnifying-glass.png';
import Form from '../InputForm/InputForm';
import SearchButton from '../SearchButton/SearchButton';
import ResultBox from '../ResultBox/ResultBox';
import './SearchBox.css';

const SearchBox = ({
    header,
    character,
    setCharacter,
    handleSubmit,
    searchSuggestions,
    loading,
    handleSuggestionClick
}) => {
    return (
        <>
            <div className="section">
                <h1>{header}</h1>
                <div className="search-bar">
                    <div className="search-input">
                        <img
                            src={magnifyingGlass}
                            alt="magnifying-glass"
                            className="magnifying-glass"
                        />
                        <Form
                            character={character}
                            setCharacter={setCharacter}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    {character.length > 2 && (
                        <ResultBox
                            searchSuggestions={searchSuggestions}
                            loading={loading}
                            handleSuggestionClick={handleSuggestionClick}
                        />
                    )}
                </div>
                <SearchButton text="Search!" formId="search-form" />
            </div>
        </>
    );
};

export default SearchBox;
