import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const { id } = action.data
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes +1
      }
      return state
      .map((a) => a.id !== id ? a : votedAnecdote)
      .sort((a1, a2) => a2.votes - a1.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a1, a2) => a2.votes - a1.votes)
    default:
      return state
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (voted) => {
  return async dispatch => {
    const votedAnecdote = {
      ...voted,
      votes: voted.votes + 1
    }
    console.log(votedAnecdote)
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    const { id } = updatedAnecdote
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer