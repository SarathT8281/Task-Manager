import './App.css';
import LoginSignUp from './Components/LoginSignup';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import Tasks from './Components/Tasks';
import NavAndProfile from './Components/NavAndProfile';
import NavAndTask from './Components/NavAndTask';

function App() {
  return (
    <div className="App">.
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignUp/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/home' element={<NavAndProfile/>}/>
        <Route path='/task' element={<NavAndTask/>}/>
      </Routes>
    </Router>
      
     
      
    </div>
  );
}

export default App;
