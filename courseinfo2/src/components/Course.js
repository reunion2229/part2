import React from 'react'

const Course = ({ name, partWithExercise, sum }) => {
    return (
        <>
            <h2>{name}</h2>
            {partWithExercise}
            <h4>total of {sum} exercises</h4>
        </>
    )
}

export default Course