import React from 'react';
import { BlogCard } from './BlogCard';

export interface Blog{
    "content":string;
    "title":string;
    "description":string;
    "id":number;
    "createdAt":Date;
    "author":{
        "name":string;
    }
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map(blog => <BlogCard
            id={blog.id}
            authorName={blog.author.name||"Anonymous"}
            title={blog.title}
            content={blog.content}
            description={blog.description}
            publishedDate={new Date(blog.createdAt).toLocaleDateString()}
       />)
      )}
    </div>
  );
};

export default BlogList;
