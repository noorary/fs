import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </div>
    )  
}

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) =>
      <Part key={part.id} part={part}></Part>
      )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum += part.exercises, 0)

  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

export default Course