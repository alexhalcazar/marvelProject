import './FeatureSelection.css';
import '../../styles/fonts.css';
import { Link } from 'react-router';

const FeatureSelection = ({
    header,
    paragraph,
    page,
    items,
    myClass,
    children
}) => {
    return (
        <>
            <div className={`section ${myClass}`}>
                <h1>{header}</h1>
                <p>{paragraph}</p>
                <div className={`row ${myClass}`}>
                    {items.map((item, index) => {
                        return (
                            <div className="column" key={index}>
                                <Link to={`${page}?name=${item.query}`}>
                                    {item.imgPath && (
                                        <img
                                            src={item.imgPath}
                                            alt={item.alt}
                                        />
                                    )}
                                </Link>
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
