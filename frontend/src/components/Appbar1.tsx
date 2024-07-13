import { useUser } from "../hooks";
import { Link } from "react-router-dom";
import React from "react";



interface AppbarProps {
  onButtonClick: () => void;
}


export const Appbar1: React.FC<AppbarProps> = ({ onButtonClick }) => {

  const token = localStorage.getItem("token")||"";
  console.log(token);

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64));
  const decode = JSON.parse(jsonPayload);
  console.log(decode.id);
  const id=(decode.id).toString();
  console.log(id);


  if (!token) {
      console.log("No token found");
      return;
  }

  const {loading,name}=useUser({id});
  console.log(name);
  if(loading)
      {
          return <div className="border-b py-4 flex justify-between items-center px-2 sm:px-10">
          <Link to={'/blogs'} className="flex items-center text-xl font-semibold cursor-pointer">
              Insight
          </Link>
          
          <div className="flex flex-row -mr-10">
          <button
              type="button"
              onClick={onButtonClick}
              className="focus:outline-none text-white bg-gray-500 hover:bg-black font-medium rounded-lg text-sm px-2 sm:px-5 py-2.5 me-2 mt-4 mr-12"
            >
              Publish
            </button>
              {/* <DarkMode/> */}
          {/* <Avatar1 name={name}/> */}
          </div>
      </div>
      }
  return <div className="border-b py-4 flex justify-between items-center px-2 sm:px-10">
      <Link to={'/blogs'} className="flex items-center text-xl font-semibold cursor-pointer">
          Insight
      </Link>
      
      <div className="flex flex-row -mr-10">
      <button
          type="button"
          onClick={onButtonClick}
          className="focus:outline-none text-white bg-gray-500 hover:bg-black font-medium rounded-lg text-sm px-2 sm:px-5 py-2.5 me-2 mt-4 mr-12"
        >
          Publish
        </button>
          {/* <DarkMode/> */}
      {/* <Avatar1 name={name}/> */}
      </div>
  </div>
}
