import { useSearchedBlogs } from "../hooks"
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";


export const SearchedBlogs=()=>{
    const {loading,blogs}=useSearchedBlogs();

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
             description={blog.description}
             publishedDate={blog.createdAt}
        />)}
        </div>
        </div>
    </div>    
}
