import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {

  if(props.all === 0) {
    return 'No feedback given'
  }

  return (
    <div>
      <table>
        <tbody>
      <StatisticLine text='good' value={props.good}></StatisticLine>
      <StatisticLine text='neutral' value={props.neutral}></StatisticLine>
      <StatisticLine text='bad' value={props.bad}></StatisticLine>
      <StatisticLine text='all' value={props.all}></StatisticLine>
      <StatisticLine text='average' value={props.sum / props.all}></StatisticLine>
      <StatisticLine text='positive' value={props.good / props.all *100 + ' %'}></StatisticLine>
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGoodClick = () => {
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
      <Button onClick={handleGoodClick} text='good'></Button>
      <Button onClick={handleNeutralClcik} text='neutral'></Button>
      <Button onClick={handleBadClick} text='bad'></Button>
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} all={all} sum={sum} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
