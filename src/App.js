import Navbar from './Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MenuPetugas from './pages/MenuPetugas';
import { Route, Routes } from 'react-router-dom';
import './styles.css';
import image from './background2.jpg';

function App() {
  return (
    <>
      <Navbar />
      <div
        className="d-flex"
        style={{ backgroundImage: `url(${image}` }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<MenuPetugas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
