import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Tours from './views/Tours';
import EditTour from "./views/EditTour";
import NewTour from "./views/NewTour";
import Dashboard from "./views/Dashboard";

const root= createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/login" element={<Login/>} />
<Route path="/tours" element={<Tours/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="/edittour" element={<EditTour/>} />
<Route path="/newtour" element={<NewTour/>} />
<Route path='/dashboard' element={<Dashboard/>} />
</Routes>
</BrowserRouter>
 
);
