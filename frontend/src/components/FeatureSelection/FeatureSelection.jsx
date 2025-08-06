import './FeatureSelection.css';
import '../../styles/fonts.css';

const FeatureSelection = ({ header, paragraph, items, children }) => {
    return (
        <>
            <div className="section">
                <h1>{header}</h1>
                <p>{paragraph}</p>
                <div className="row">
                    {items.map((item, index) => {
                        return (
                            <div className="column" key={index}>
                                {item.image && (
                                    <img src={item.image} alt={item.alt} />
                                )}
                            </div>
                        );
                    })}
                </div>
                {children}
            </div>
        </>
    );
};

export default FeatureSelection;
