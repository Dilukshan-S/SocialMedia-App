import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { format } from 'date-fns';

function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "March 19 2024 12:22;44 AM",
      body: "Creating an application using React.js."
    },
    {
      id: 2,
      title: "My second Post",
      datetime: "March 19 2024 12:25;44 AM",
      body: "Finding the will to live."
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "March 19 2024 12:27;44 AM",
      body: "Watching React.js youtube tutorials."
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "March 19 2024 12:29;44 AM",
      body: "Just a sample post for testing purposes."
    },
  ])
  const [search, setSearch]= useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() =>{
    const filteredResults = posts.filter((post) =>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const postsList =  posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  }

  return  (
    <div className="App">
      <Header title="Social Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchResults}/>} />
        <Route path="post" >
            <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            />}/>
            <Route path=":id" element={
              <PostPage 
                posts={posts} 
                handleDelete={handleDelete}
              />} 
            />
        </Route>
        <Route path="about"  element={<About />}/>
        <Route path="*"  element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;