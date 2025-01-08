import { createRoot } from 'react-dom/client';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import './index.css';
import "./Css/Base/colors.css";
import "./Css/Components/form.css";
import "./Css/Base/media.css";
import SideBarIsOpen from './Context/SideBarIsOpen';
import WindowSize from './Context/WindowSize.jsx';

createRoot(document.getElementById('root')).render(
    <WindowSize>
    <SideBarIsOpen>
    <HashRouter>
        <App />
    </HashRouter>
    </SideBarIsOpen>
    </WindowSize>
)
