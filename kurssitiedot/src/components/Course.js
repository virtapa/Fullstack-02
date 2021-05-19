import React from 'react'


const Header = (props) => {
    return (
      <h2>{props.name}</h2>
    )
  }
  
  const Total = (props) => {
    return <h4>Number of exercises: {props.parts.reduce(
        (acc, curr) => { return { "exercises": acc.exercises + curr.exercises } }
      ).exercises
      }</h4>

  }

  const Content = ({ parts }) => {
    const partsList = parts.map((item) => {
      return <Part key={item.id} name={item.name+":"} exercises={item.exercises} />
    })
  
    return (
      <div>
        {partsList}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course