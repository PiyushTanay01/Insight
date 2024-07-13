import { useUser } from "../hooks"
import { Avatar1 } from "./Avatar1"; 
import { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

interface Blog {
    authorName:string;
    title:string;
    content:string;
    description:string;
    publishedDate:Date;
    id:number;
  }
  
export const Appbar=()=>{

    const token = localStorage.getItem("token")||"";
    console.log(token);

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));
    const decode = JSON.parse(jsonPayload);
    console.log(decode.id);
    const id=(decode.id).toString();
    console.log(id);

    const [results,setResults]=useState<Blog[]>([]);

    if (!token) {
        console.log("No token found");
        return;
    }

    const {name,about}=useUser({id});
    console.log(name);
    
    return <div className="border-b pt-4 sm:py-4 flex justify-between items-center px-1 sm:px-10">
        <Link to={'/blogs'} className="flex items-center text-xl font-semibold cursor-pointer">
            Insight
        </Link>
        <SearchBar setResults={setResults}/>
        {results.length > 0 ? <SearchResultsList results={results} /> : null}  
        <div>
        <Link
                  to={'/publish'}
                  className=" md:flex items-center gap-1 text-gray-500 mr-20 sm:mr-12 mt-5">
                  <span className="text-3xl">
                    <LiaEditSolid />
                  </span>
                  <span className="text-sm mt-0 sm:mt-2">Write</span>
        </Link>          
        <Avatar1 name={name} about={about}/>
        </div>
        {/* <DarkMode/> */}
    </div>
}