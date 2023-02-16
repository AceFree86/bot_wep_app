import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Form from './components/Form/Form';
import Form2 from './components/Form2/Form2';


function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
    
    <h1>Титулка</h1>
   
        <Routes>
          <Route path='/' element={<Form />}/>
          <Route path='/form2' element={<Form2 />}/>
        </Routes>
    
    </div>
  );
}

export default App;
