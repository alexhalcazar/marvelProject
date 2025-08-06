import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import MarvelSnap from './pages/MarvelSnap/MarvelSnap';
import NavBar from './components/NavBar/NavBar';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/marvelSnap" element={<MarvelSnap />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
