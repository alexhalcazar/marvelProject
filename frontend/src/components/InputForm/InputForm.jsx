const Form = ({ character, setCharacter, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} id="search-form">
            <input
                type="text"
                className="input-field"
                id="character-value"
                placeholder="Search Character"
                autoComplete="off"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
            />
        </form>
    );
};

export default Form;
