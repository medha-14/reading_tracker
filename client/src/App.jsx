import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './router/Home';
import About from './router/About';
import Signup from './router/Signup';
import Login from './router/Login';
import NewBook from './router/NewBook';
import Bookshelf from './router/Bookshelf';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:username/newbook" element={<NewBook />} />
        <Route path="/:username/bookshelf" element={<Bookshelf />} />
      </Routes>
    </div>
  );
}

export default App;
