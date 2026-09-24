// import Login from './pages/login'; 
// import Home from './pages/Home';
// import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './assets/css/style.css';
import './assets/css/bootstrap.min.css';
// import './assets/images';
import AppRoutes from '../routes/AppRoutes';



function App() {    

  return (   
<>
    <BrowserRouter>
      <Routes>
        <AppRoutes />
      </Routes>
    </BrowserRouter>

    
</>

  );
};

export default App;
