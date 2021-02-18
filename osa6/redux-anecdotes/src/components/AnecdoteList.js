import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    anecdotes.map(a =>
      <div key={a.id}>
        <div>
          {a.content}
        </div>
        <div>
          has {a.votes}
          <button onClick={() => dispatch(vote(a.id))}>vote</button>
        </div>
      </div>)
  )
}

export default AnecdoteList