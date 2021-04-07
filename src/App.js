import React, { createContext, useContext, useState } from 'react';
import './App.css';

const CounterContext = createContext();

const ContextProvider = ({children})=>{
  // Это наша компонента. Мы сами ее называем и делаем. Не стандартная
// Здесь обявляем данные, к которым будет доступ у всех элементов обернутых
// в CounterContext.Provider в ретерне
  const [counter, setCounter] = useState(0);
  const incCounter = ()=>{
    setCounter(counter+1);
  }
  const decCounter = ()=>{
    setCounter(counter-1)
  }

  return (
    <CounterContext.Provider value={{
      counter,
      incCounter,
      decCounter,
    }}>
    {children}
    </CounterContext.Provider>
  )
}

const Counter = ()=>{
  const {counter, decCounter, incCounter} = useContext(CounterContext)
  return (
    <>
    <h2>Счетчик {counter}</h2>
    <button onClick={decCounter}> decrement counter</button>
    <button onClick={incCounter}> increment counter</button>
    </>
  )
}
const Header = ()=>{
  //const counterContext = useContext(CounterContext) Это получение всего обхекта
  const {counter} = useContext(CounterContext)

  return (
    <h1>Header counter  {counter}</h1>
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
