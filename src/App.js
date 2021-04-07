import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom'
//import { Route } from 'react-router';

const TodoContext= createContext();

const TodoContextProvider = ({children})=>{
  const [todos, setTodos]= useState([])
  const [doneTodos, setDoneTodos]= useState([])
  
  const onTodoCreate = (newTodo)=>{
    if(!newTodo || !newTodo.title || !newTodo.description){
      console.error('Wrong arguments for todo')
      return
    }
    setTodos([newTodo, ...todos])
  }
  const onTodoRemove = (todoId) =>{
    if(!todoId) {
      console.error('wrong todo id')
      return
    }
    setTodos(todos.filter(el=> el.id !== todoId))
  }
  
  const isDoneToggle=(todoId)=>{
    const isTodoMarkedAsDone = doneTodos.includes(todoId)
    if (isTodoMarkedAsDone ) {
      setDoneTodos(doneTodos.filter(id=>id !== todoId))
      return
    }
    setDoneTodos([...doneTodos, todoId])

  }
  return (
    <TodoContext.Provider value={{
      todos,
      onTodoCreate,
      onTodoRemove,
      isDoneToggle,
      doneTodos
    }}>
    {children}
    </TodoContext.Provider>
  )
}

const TodoItem =({todo, onTodoRemove, isDoneToggle})=>{

  const onTodoDelete = ()=>{
    const answer= window.confirm('Do you want to delete todo?')
    if (answer) {
      onTodoRemove(todo.id)
    }
  }
  const onMarkIsDoneToggle = ()=> isDoneToggle(todo.id)

  
  return(
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <button onClick={onTodoDelete}> Remove todo</button>
      <button onClick={onMarkIsDoneToggle}> Mark as done</button>
    </div>
  )
}

const TodoList = ()=>{
  const {
    todos,
    onTodoRemove,
    isDoneToggle,
    doneTodos
  } = useContext(TodoContext)
  console.log(doneTodos)

  return (
    <div>
      {todos.map(el => <TodoItem 
        isDoneToggle={isDoneToggle} 
        key={el.title+el.description}
        onTodoRemove = {onTodoRemove}
         todo={el} 
         />)}
    </div>
  )
}

const AddTodo = ()=>{
  const [todoValues, setTodoValues]=useState({
    title:'',
    description:'',
    id:null,
  })

  const {
    onTodoCreate
  } = useContext(TodoContext)

  const onTodoChange = ({target :{name,value}}) =>{ 
    
    setTodoValues({...todoValues, [name]:value}
  )}
  const onCreate=()=>{
    //Здесь будет добавление
    onTodoCreate({...todoValues, id:Math.random()})

    // А дальше идет очистка формы
    setTodoValues({
      title:'',
      description:'',
      id:null
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
