import './SearchButton.css';

const SearchButton = ({ text, formId, myClass }) => {
    return (
        <button
            type="submit"
            className={`comic-button ${myClass}`}
            form={formId}
        >
            {text}
        </button>
    );
};

export default SearchButton;
