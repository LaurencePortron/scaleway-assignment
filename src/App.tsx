import './App.css';
import './index.css';
import Home from './components/Home';
import ServerDetails from './components/ServerDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/server/:id' element={<ServerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
