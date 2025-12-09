import { useState } from "react"
import { Search } from "lucide-react"

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  const handleInputChange = (e) => {
    const text = e.target.value
    setSearchText(text)
    onSearch(text)
  }

  return (
    <div className="relative w-full max-w-xs">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-zinc-400" />
      </div>
      <input
        type="text"
        placeholder="Search items..."
        value={searchText}
        onChange={handleInputChange}
        className="block w-full rounded-md border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchBox