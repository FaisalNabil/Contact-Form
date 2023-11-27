import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FormBuilder from './components/FormBuilder/FormBuilder';
//import History from './components/History/History';
import NotFound from './components/NotFound';

function App() {
  return (
     <div className="App">
      <header className="App-header">
        <h1>Customizable Contact Form</h1>
      </header>
      <main className="App-main">
        <FormBuilder />
      </main>
      <footer className="App-footer">
        <p>Created with ♥ by Your Name</p>
      </footer>
    </div>
  /*<Router>
      <div className="App">
        <header className="App-header">
          <h1>Customizable Contact Form</h1>
          <nav>
            <Link to="/" style={{ marginRight: 10 }}>Home</Link>
            <Link to="/history">History</Link>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<FormBuilder />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>Created with ♥ by Tousif</p>
        </footer>
      </div>
    </Router> */
    
  );
}

export default App;
