import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useTelegram} from "../../hooks/useTelegram";


function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])


  return (
    <div className="App">
      work
     
     <button onClick={onToggleButton}>ToggleButton</button>
    </div>
  );
}

export default App;
