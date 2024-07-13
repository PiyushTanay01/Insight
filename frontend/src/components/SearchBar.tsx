import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { BACKEND_URL } from "../config";

interface SearchBarProps {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
}
  
  export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
    const [input,setInput]=useState("");
    const searchBoxRef = useRef<HTMLDivElement>(null);
    
    const fetchData=async(query:string)=>{
        try {
            const res=await axios.get(`${BACKEND_URL}/api/v1/blog/search?query=${query}`,
            {headers:{Authorization:localStorage.getItem("token")}});
            console.log(res.data);
            setResults(res.data.blogs);
        }
        catch(e){
            console.log(e);
        } 
    }

    const handleChange=(value:string)=>{
        setInput(value);
        console.log(value);
        if (value === null) {
            console.log(value);
            setResults([]); // Clear results if input is empty
          }
         else {
        fetchData(value);
          }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
          setResults([]); // Clear results if clicking outside
        }
      };
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
    <div ref={searchBoxRef} className="hidden sm:block relative border-2 bg-white  rounded-xl md:flex items-center shadow">
        <FaSearch id="search-icon" className="text-gray-400 ml-3"/>
        <input  placeholder="Type to Search..." className="w-1 sm:w-full py-2 pl-10 pr-4 text-gray-700 rounded-lg focus:outline-none"
                value={input} onChange={(e)=>handleChange(e.target.value)}/>
    </div>
    );
}