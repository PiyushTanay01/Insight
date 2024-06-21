import { useState, useEffect } from "react";
import { Blog1, addBookmark, deleteBlog, fetchBookmarkStatus, removeBookmark } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import parse from 'html-react-parser';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface About {
  "about": string;
}

export const FullBlog = ({ blog }: { blog: Blog1}) => {
  // const sanitizedContent = DOMPurify.sanitize(blog.content);
  parse(blog.content);

  const token = localStorage.getItem("token")||"";
  console.log(token);

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64));
  const decode = JSON.parse(jsonPayload);
  console.log(decode.id);
  const id=(decode.id).toString();
  console.log(id);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const navigate=useNavigate();


   const handleFetchBookmarkStatus = async () => {
    try {
      const blogId = String(blog.id);
      const isBookmarked = await fetchBookmarkStatus(blogId, token);
      setIsBookmarked(isBookmarked);
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      const blogId = String(blog.id);
      if (isBookmarked) {
        await removeBookmark(blogId, token);
        setIsBookmarked(false);
      } else {
        await addBookmark(blogId, token);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const blogId = String(blog.id);
      await deleteBlog(blogId, token);
      // Redirect to another page or give feedback to the user
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  useEffect(()=>{
    handleFetchBookmarkStatus();
    if (id == blog.authorId) {
      setIsAuthor(true);
    }
    console.log("isAuthor: ",isAuthor);
  },[isBookmarked]);

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="flex items-center">
              <div className="text-5xl font-extrabold">
                {blog.title}
              </div>
              <div
                onClick={handleBookmark}
                className="ml-4 cursor-pointer"
              >
                {isBookmarked ? (
                  <FaBookmark className="text-red-500" size={32} />
                ) : (
                  <FaRegBookmark className="text-blue-500" size={32} />
                )}
              </div>
              {isAuthor && (
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="ml-4 px-4 py-2 rounded bg-black text-white"
                >
                  Delete Blog
                </button>
              )}
            </div>
            
            <div className="text-slate-800 pt-2 italic">
              {blog.description}
            </div>
            <div className="text-slate-500 pt-2">
              Post on {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            <div id="bodyContainer" className="pt-4 pb-4">
              <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">
              Author
            </div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  {blog.author.about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Warning</h2>
            <p className="mb-4">Do you really want to delete the blog?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="mr-4 px-4 py-2 rounded bg-gray-500 text-white"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowDeleteConfirmation(false);
                }}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}