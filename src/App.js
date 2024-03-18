import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import PostLayout from "./PostLayout";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/PostPage">PostPage</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/newpost" element={<NewPost />}/>
        {/* the below lines(nested) can also be written like: 
          <Route path="/PostPage" element={<PostPage />}/>
          <Route path="/PostPage/:id" element={<Post />}/>
          <Route path="/PostPage/NewPost" element={<NewPost />}/>
         */}
         <Route path="/PostPage" element={ <PostLayout />}>
          <Route index element={<PostPage/>} />
          <Route path=":id" element={<Post />}/>
          <Route path="NewPost" element={<NewPost />}/>
        </Route>


        <Route path="*" element={<Missing/>}/>
      </Routes>
      {/* <Header />
      <Nav />
      <Home />
      <NewPost />
      <PostPage />
      <About />
      <Missing />
      <Footer /> */}
    </div>
  );
}

export default App;
