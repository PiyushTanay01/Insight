import { useParams } from "react-router-dom";
import {  useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";


export interface Blog1{
    "content":string;
    "title":string;
    "description":string;
    "id":number;
    "createdAt":Date;
    "author":{
        "name":string;
        "about":string;
    }
}



export const Blog=()=>{
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id||""
    });
    const token = localStorage.getItem("token")||"";
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));
    const decode = JSON.parse(jsonPayload);
    console.log(decode.id);
    const id1=(decode.id).toString();
    console.log(id1);

    if (loading || !blog) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner/>
                </div>
            </div>
        </div>
    }

    // const bookmark=handleFetchBookmarkStatus(blog);
    return <div>
        <FullBlog blog={blog} />
    </div>
}