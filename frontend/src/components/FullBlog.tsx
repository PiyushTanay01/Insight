import { Blog1 } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export interface About{
    "about":string;
}

export const FullBlog = ({ blog }: { blog: Blog1 }) => {
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    parse(blog.content);

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-800 pt-2 italic">
                            {blog.description}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div id="bodyContainer" className="pt-4">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    {blog.author.about}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
