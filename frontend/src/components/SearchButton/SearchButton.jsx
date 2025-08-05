import './SearchButton.css';

const SearchButton = ({ text, formId }) => {
    return (
        <button type="submit" className="comic-button" form={formId}>
            {text}
        </button>
    );
};

export default SearchButton;
