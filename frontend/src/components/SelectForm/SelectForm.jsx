import './SelectForm.css';

const SelectionForm = ({ handleChange }) => {
    return (
        <>
            <form onChange={handleChange}>
                <label htmlFor="filter" className="label">
                    Filter
                </label>
                <select name="selection" id="filter">
                    <option>energy</option>
                    <option>power</option>
                    <option>name</option>
                </select>
            </form>
        </>
    );
};

export default SelectionForm;
