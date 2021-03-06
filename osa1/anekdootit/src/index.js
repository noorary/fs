import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClick = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected]++

    console.log(votes)
    setVotes(copy)
  }

  let biggest = 0
  let index = 0
  let i = 0

  for(i=0; i<votes.length;i++) {
    if(biggest < votes[i]) {
      biggest = votes[i]
      index = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {biggest} votes</p>
    </div>
  )

    
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
