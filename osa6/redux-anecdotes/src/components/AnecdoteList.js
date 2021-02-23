import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  } 

  return (
    anecdotes.map(a =>
      <div key={a.id}>
        <div>
          {a.content}
        </div>
        <div>
          has {a.votes}
          <button onClick={() => handleVote(a)}>vote</button>
        </div>
      </div>)
  )
}

export default AnecdoteList