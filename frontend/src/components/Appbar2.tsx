import { useUser } from "../hooks";
import { Avatar1 } from "./Avatar1"; 
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";

export const Appbar2=()=>{

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

  const {loading,name,about}=useUser({id});
  console.log(name);
  if(loading)
      {
          return <div className="border-b py-4 flex justify-between px-10">
          <Link to={'/blogs'} className="flex items-center text-xl font-semibold cursor-pointer">
          Insight
         </Link>
         <div>
         </div>
          <div>
          <Link
                to={'/publish'}
                className="hidden md:flex items-center gap-1 text-gray-500 mr-12 mt-5">
                <span className="text-3xl">
                  <LiaEditSolid />
                </span>
                <span className="text-sm mt-2">Write</span>
      </Link>  
          <Avatar1 name={name} about={about}/>
          </div>
          </div>
      }
  return <div className="border-b py-4 flex justify-between items-center px-10">
      <Link to={'/blogs'} className="flex items-center text-xl font-semibold cursor-pointer">
          Insight
      </Link> 
      <div>
      <Link
                to={'/publish'}
                className="hidden md:flex items-center gap-1 text-gray-500 mr-12 mt-5">
                <span className="text-3xl">
                  <LiaEditSolid />
                </span>
                <span className="text-sm mt-2">Write</span>
      </Link>          
      <Avatar1 name={name} about={about}/>
      </div>
  </div>
}