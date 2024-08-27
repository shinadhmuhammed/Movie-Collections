import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import AddMovie from './Components/AddMovie';
import GetMovie from './Components/GetMovie';
import GetActorMovies from './Components/GetActorMovies';
import GetDirectorMovies from './Components/GetDirectorMovies';


function App() {
  return (
   <div>
     <Router>
        <Routes>
        <Route path='/signup' element={< Signup/>} />
        <Route path='/' element={< Login/>} />
        <Route path='/home' element={< AddMovie/>} />
        <Route path='/movies' element={< GetMovie/>} />
        <Route path='/getActorMovies' element={< GetActorMovies/>} />
        <Route path='/getDirectorMovies' element={< GetDirectorMovies/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
