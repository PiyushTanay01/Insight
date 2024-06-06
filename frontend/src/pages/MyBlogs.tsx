import { useUserBlogs } from "../hooks"
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";


export const MyBlogs=()=>{
    const {loading,blogs}=useUserBlogs();

    if(loading)
        {
            return <div>
            <Appbar/>
            <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>
            </div>
            </div>
        }
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div>
            {blogs.map(blog=><BlogCard
             id={blog.id}
             authorName={blog.author.name||"Anonymous"}
             title={blog.title}
             content={blog.content}
             description={blog.description}
             publishedDate={new Date(blog.createdAt).toLocaleDateString()}
        />)}
        </div>
        </div>
    </div>    
}
