import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

const twa = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    twa.ready();
  }, [])

  const onClose = () => {
    twa.close()
  }

  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрити</button>
    </div>
  );
}

export default App;
