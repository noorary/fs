import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = props => {
  //   return props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
  // }

  const handleVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(a =>
        <div key={a.id}>
          <div>
            {a.content}
          </div>
          <div>
            has {a.votes}
            <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes