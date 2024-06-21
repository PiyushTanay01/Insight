interface Blog {
  authorName:string;
  title:string;
  content:string;
  description:string;
  publishedDate:Date;
  id:number;
}

interface SearchResultsListProps {
  result: Blog;
}

export const SearchResult: React.FC<SearchResultsListProps> = ({ result }) => {
   return (<a
    className='px-4 py-2 hover:bg-gray-300 cursor-pointer'
    href={`localhost:5173/blog/${result.id}`}
  >
    {result.title} 
  </a>)
    {/* {result.title} by {result.author.name} */}
}
