import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Perechin from './components/Perechin/Perechin';
import Uzhhorod from './components/Uzhhorod/Uzhhorod';


function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Perechin />}/>
          <Route path='/uzhhorod' element={<Uzhhorod />}/>
        </Routes>
    </div>
  );
}

export default App;
