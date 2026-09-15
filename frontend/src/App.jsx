import Login from './pages/login'; 
import Home from './pages/Home';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './assets/css/style.css';
import './assets/css/bootstrap.min.css';
// import './assets/images';



function App() {    

  return (   
<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>

    
</>

  );
};

export default App;
