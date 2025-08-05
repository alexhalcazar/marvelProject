import './ResultBox.css';

const ResultBox = ({ searchSuggestions, loading, handleSuggestionClick }) => {
    let content;
    if (loading) {
        content = <li>Loading...</li>;
    } else if (
        Array.isArray(searchSuggestions) &&
        searchSuggestions.length === 0
    ) {
        content = <li>No Results Found</li>;
    } else if (Array.isArray(searchSuggestions)) {
        content = searchSuggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
            </li>
        ));
    }

    return (
        <>
            <div className="result-box">
                <ul>{content}</ul>
            </div>
        </>
    );
};

export default ResultBox;
