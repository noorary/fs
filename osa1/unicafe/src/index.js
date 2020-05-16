import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGoodClick = () => {
    console.log('good clicked')
    setGood(good+1)
    setAll(all+1)
    setSum(sum+1)
  }

  const handleNeutralClcik = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
    setSum(sum-1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClcik}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {sum / all}</p>
      <p>positive {good / all * 100} %</p>
      
    </div>
  )
}

const Button = ({handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)
