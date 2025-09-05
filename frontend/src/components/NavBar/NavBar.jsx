import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/characters">Characters</Link>
                    </li>
                    <li>
                        <Link to="/comics">Comics</Link>
                    </li>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/marvelSnap">MarvelSnap</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
