import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom'
//import { Route } from 'react-router';

const TodoList = ()=>{
  return (
    <h2> Todo list</h2>
  )
}
const AddTodo = ()=>{
  return (
    <h2> Create todo</h2>
  )
}

const Header = ()=>{
  return (
    <header>
      <Link to='/'>Todo list</Link>
      
      <Link to='/create-todo'>Create todo</Link>
    </header>
  )
}

export default function App() {
  return (
    // 1 мписок тудушек
    // форма создания тудушки
    <main>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <TodoList />
        </Route>
        <Route path='/create-todo'>
          <AddTodo />
        </Route>

      </Switch>
    </Router>
    </main>
  );
}
