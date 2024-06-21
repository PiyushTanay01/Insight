
export const SearchResult = ({result}) => {
   return (<a
    className='px-4 py-2 hover:bg-gray-300 cursor-pointer'
    href={`localhost:5173/blog/${result.id}`}
  >
    {result.title} by {result.author.name}
  </a>)
    {/* {result.title} by {result.author.name} */}
}
