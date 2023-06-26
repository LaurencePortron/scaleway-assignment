import './App.css';
import './index.css';
import { ServersList } from './components/ServersList';
import { ServerDetails } from './components/ServerDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ServersList />} />
          <Route path='/server/:id' element={<ServerDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
