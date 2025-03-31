import { useSearchParams } from "react-router-dom"

const SortOption = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const handleSortChange =(e) => {
        const sortBy = e.target.value
        searchParams.set("sortBy", sortBy)
        setSearchParams(searchParams)
    }

    return(
        <div className="mb-4 flex items-center justify-end ">
            <select id="sort" className="border p-2 rounded-md focus:outline-none"> 
            onChange={handleSortChange}
            value={searchParams.get("sortby" || "")}
                <option value="">default</option>
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
                <option value="">Popularity</option>
            </select>
        </div>
    )
}

export default SortOption