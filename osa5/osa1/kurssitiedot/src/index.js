import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
    return (
    <div>
      <h1>{props.course.name} </h1>
    </div>
    )
}
  


const Content = (props) => {
  console.log(props)
  const parts = props.course.parts
  return ( 
    <div>
      <Part name={parts[0].name}  exercises={parts[0].exercises}/>
      <Part name={parts[1].name}  exercises={parts[1].exercises}/>
      <Part name={parts[2].name}  exercises={parts[2].exercises}/>
      </div>
  )
}

const Total = (props) => {
  console.log(props)
  const parts = props.course.parts
  return ( 
  <div>
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
