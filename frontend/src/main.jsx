import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import $ from 'jquery';

window.$ = $;
window.jQuery = $;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
// import 'owl.carousel';

// import "./assets/js/main.js";
import './index.css'
import "./assets/css/style.css";
// import "./assets/css/bootstrap.min.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// async function startApp() {

//   await import('owl.carousel');
//   await import('./assets/js/main.js');

//   createRoot(document.getElementById('root')).render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// }

// startApp();