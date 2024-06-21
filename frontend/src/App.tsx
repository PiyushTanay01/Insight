import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { MyBlogs } from './pages/MyBlogs'
import { SearchedBlogs} from './pages/SearchedBlogs'
import { Bookmark } from './pages/Bookmark'
import EditProfile from './pages/EditProfile'
import HomePage from './pages/Homepage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/signin" element={<Signin/>}/>
           <Route path="/blog/:id" element={<Blog/>}/>
           <Route path="/blogs" element={<Blogs/>}/>
           <Route path="/publish" element={<Publish/>}/>
           <Route path='/myBlogs' element={<MyBlogs/>}/>
           <Route path='/search/:query?' element={<SearchedBlogs/>}/>
           <Route path='/editProfile' element={<EditProfile/>}/>
           <Route path='/bookmark' element={<Bookmark/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
