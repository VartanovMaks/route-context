import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom'
//import { Route } from 'react-router';

const TodoContext= createContext();

const TodoContextProvider = ({children})=>{
  const [todos, setTodos]= useState([])
  const onTodoCreate = (newTodo)=>{
    if(!newTodo || !newTodo.title || !newTodo.description){
      console.error('Wrong arguments for todo')
      return
    }
    setTodos([newTodo, ...todos])
  }
  return (
    <TodoContext.Provider value={{
      todos,
      onTodoCreate
    }}>
    {children}
    </TodoContext.Provider>
  )
}

const TodoItem =({todo})=>{
  // <li >
  return(
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
    </div>
  )
}

const TodoList = ()=>{
  const {
    todos
  } = useContext(TodoContext)

  return (
    <div>
      {todos.map(el => <TodoItem key={el.title+el.description} todo={el} />)}
    </div>
  )
}

const AddTodo = ()=>{
  const [todoValues, setTodoValues]=useState({
    title:'',
    description:'',
  })

  const {
    onTodoCreate
  } = useContext(TodoContext)

  const onTodoChange = ({target :{name,value}}) =>{ 
    
    setTodoValues({...todoValues, [name]:value}
  )}
  const onCreate=()=>{
    //Здесь будет добавление
    onTodoCreate(todoValues)

    // А дальше идет очистка формы
    setTodoValues({
      title:'',
      description:'',
    })
  }
  return (
    <div>
      <input value={todoValues.title} onChange={onTodoChange} type='text' name='title' placeholder='input todo title' />
      <input value={todoValues.description} onChange={onTodoChange} type='text' name='description' placeholder='input todo description' />
      <button onClick={onCreate}>Add todo</button>
    </div>
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
    <TodoContextProvider>
      <main>
      <Router>
        <Header />
        <div style={{padding:20}}>
          <Switch>
            <Route path='/' exact>
              <TodoList />
            </Route>
            <Route path='/create-todo'>
              <AddTodo />
            </Route>
          </Switch>
        </div>  
      </Router>
      </main>
    </TodoContextProvider>
  );
}
