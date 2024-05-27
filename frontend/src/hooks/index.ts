import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string;
    "title":string;
    "id":number;
    "author":{
        "name":string;
    }
}

export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>();
    
    const Blog1=async()=>{
        try{
            const res=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                Authorization:localStorage.getItem("token")
                }
            });
            setBlog(res.data.blog);
            setLoading(false);
        }
        catch(e)
        {
            console.log("Error while fetching data:",e);
        }
    }

    useEffect(()=>{
        Blog1();
    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    
    const Blog1=async()=>{
        try{
            const res=await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{headers:{
                Authorization:localStorage.getItem("token")}
            });
            setBlogs(res.data.blogs);
            setLoading(false);
        }
        catch(e)
        {
            console.log("Error while fetching data:",e);
        }
    }

    useEffect(()=>{
        Blog1();
    },[])

    return {
        loading,
        blogs
    }
}