import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import MarvelSnap from './pages/MarvelSnap/MarvelSnap';
import Comics from './pages/Comics/Comics';
import NavBar from './components/NavBar/NavBar';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/marvelSnap" element={<MarvelSnap />} />
                <Route path="/comics" element={<Comics />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
