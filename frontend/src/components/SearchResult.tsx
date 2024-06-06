export const SearchResult = ({result}) => {
   return <div className='px-4 py-2 hover:bg-gray-300 cursor-pointer' >{result.title} by {result.author.name}</div>
    {/* {result.title} by {result.author.name} */}
}
