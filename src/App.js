import React, { createContext } from 'react';
import './App.css';

const CounterContext = createContext();
const ContextProvider = ({children})=>{
// Здесь обявляем данные, к которым будет доступ у всех элементов обернутых
// в CounterContext.Provider в ретерне

  return (
    <CounterContext>
    {children}
    </CounterContext>
  )
}

const Counter = ()=>{
  const [counter, setCounter] = useState(0);

  return (
    <h2 onClick={()=> setCounter(counter+1)}>Счетчик {counter}</h2>
  )
}
const Header = ()=>{
  
  return (
    <h1>Header counter </h1>
  )
}
export default function App() {
  return (
    <ContextProvider>
      <Header />
      <Counter />
    </ContextProvider>
  );
}
