import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter anecdotes 
      <input name='filter' onChange={handleChange}></input>
    </div>
  )
}

export default Filter