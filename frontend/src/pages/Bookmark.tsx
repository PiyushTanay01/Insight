import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBookmark } from "../hooks"

export const Bookmark=()=>{
    const {loading,blogs}=useBookmark();
    if(loading){
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
             id={blog.blog.id}
             authorName={blog.blog.author.name||"Anonymous"}
             title={blog.blog.title}
             content={blog.blog.content}
             description={blog.blog.description}
             publishedDate={new Date(blog.blog.createdAt).toLocaleDateString()}
        />)}
        
        </div>
        </div>
    </div>     
}