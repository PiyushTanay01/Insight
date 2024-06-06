import ReactQuill from "react-quill";
// import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Appbar1 } from "../components/Appbar1";
import { BACKEND_URL } from "../config";
import axios from "axios"; 
import {  useNavigate } from "react-router-dom";


const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["image", "video"],
  ],
};

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description,setDescription]=useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          description,
          content: value, 
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    }
  };

  return (
    <div>
      <Appbar1 onButtonClick={handleSubmit} />
      

      <div className="relative h-screen w-full">
        {/* <div className="flex items-center justify-center h-full w-full"> */}
        <div className="grid grid-cols-2 h-full">  
          <div className="flex flex-col mt-0 pt-0 relative h-full ">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 mt-4 p-2 w-full border"
            />
            <input
              type="text"
              placeholder="Blog Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 mt-4 p-2 w-full border"
            />
            <div className="relative h-full w-full flex items-center justify-center">
              <ReactQuill
                className="h-full w-full"
                theme="snow"
                value={value} 
                onChange={setValue}
                modules={modules}
              />
            </div>
          </div>
            <div className="w-full relative h-full p-3 border-l border-black overflow-y-scroll" dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
      </div>
    </div>
  );
};