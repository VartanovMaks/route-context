import React, { useState } from 'react';
import './App.css';

const Counter = ()=>{
  const [counter, setCounter] = useState(0);

  return (
    <h2 onClick={()=> setCounter(counter+1)}>Счетчик {counter}</h2>
  )
}
const Header = ()=>{
  
  return (
    <h1 onClick={()=> setCounter(counter+1)}>counter</h1>
  )
}
export default function App() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  );
}
