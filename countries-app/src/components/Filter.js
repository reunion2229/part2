const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
            find countries <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange} />
        </div>
    )
}

export default Filter