import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NoteState from './context/notes/NoteSate';
import Footer from './components/Footer';
import Alert from './components/Alert';
import ExtraState from './context/notes/ExtraState';
import Login from './components/Login';
import Signup from './components/Signup';




function App() {
  return (
    <>
    <NoteState>
    <ExtraState>
    <BrowserRouter>
    <Navbar/>
    <Alert/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route exact path='about' element={<About/>} />
      <Route exact path='login' element={<Login/>}/>
      <Route exact path='signup' element={<Signup/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </ExtraState>
    </NoteState>
    </>
  );
}

export default App;
