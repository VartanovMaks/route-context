import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory

} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            {/* <li>
              <Link to="/posts/1">Post</Link>
            </li> */}
          </ul>
        </nav>

        <Switch>
          {/* Прокидываем пропсы */}
          <Route path="/"  component={Home} exact/>
          
          <Route path="/posts">
            <Posts />
          </Route>
          
          
          
          <Route> Page not found</Route>

        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  return <h2>Home</h2>;
}

function Posts() {
  const [posts, setPosts] = React.useState([]);
  
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setPosts(data);
    console.log(data);  
  }

  React.useEffect(()=>{
    fetchData();
  }, [])
  
  return (
    <div>
      <Switch>
        <Route path="/posts/:id">
          <Post />
        </Route>
        <Route>
          <Redirect to='/posts' />
          {/* <Redirect to='/home' /> */}
        </Route>
      </Switch>
      <h2>Posts</h2>
      {posts.map(p => <Link to={`/posts/${p.id}`}><li>{p.title} - {p.id}</li></Link>)}
    </div>
    
    )
}

function Post(props) {
  const [post, setPost] = React.useState();
  
  const match = useRouteMatch();
  // const params = useParams();
  // из парамс достаем ID
  const location = useLocation();
  const {id} = useParams();
  const history = useHistory();
  
  //console.log({match, params, location})
  
  const fetchData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    setPost(data);
    console.log(data);  
  }

  React.useEffect(()=>{
    fetchData();
  }, [id])
  
  return (
    <div>
      <h2>Post #{id}</h2>
      { post && (<>{post.title} - {post.id}</>)}
      <br/>
      <button onClick={()=> history.push(`/posts/${+id+1}`)}> To next post</button>
    </div>
    )
}
