const Persons = ({ persons, handleClick }) => {
    return (
        <li>
            {persons.name} {persons.number} <button onClick={handleClick}>delete</button>
        </li>
    )
}

export default Persons