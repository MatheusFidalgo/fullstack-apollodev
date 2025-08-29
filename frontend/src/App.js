import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Log from './components/Log'; 
import NavBar from './components/NavBar';
import Table from './components/Table';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/table" element={<Table/>}/>
        <Route path="/log" element={<Log/>}/>
        <Route path="/edit/:id" element={<EditProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;