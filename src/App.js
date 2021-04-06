import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {/* Прокидываем пропсы */}
          <Route path="/" component={Home} exact />
          
          {/* прокидываем пропсы и делаем проверки */}
            <Route path="/users" render={(args)=>{
              console.log(args);
              return <Users />
            }} 
          />
          {/* Прокидываем пропсы */}
          <Route path="/about">
            {About}
          </Route>
          {/*  Без прокидывания пропсов */}
          <Route path="/test-route">
            <About />
          </Route>
          
          {/* Ни один путь не совпал, поэтому переходим например на about */}
          <Route>
            <Redirect to="/about" />
          </Route>

          {/* если ни один роут не попал второй вариант
          <Route> Page not found</Route> */}

        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  console.log(props);
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}