const SearchField = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange} />
        </div>
    )
}

export default SearchField
