import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {register} from './utils/fetch.js'
import './App.css'
const initialState = {
  email: '',
  password: '',
  username: ''
}
function App() {
  const [date, setDate] = useState(initialState)
const onSubmit = (e) => {
  e.preventDefault()
  const res = register(date)
  console.log(res)
  

  // console.log(res) // дає пендієнт
}
  return (
   <>
     <h1>hello</h1>
     <form action="">
     <input type="text" placeholder="username" onChange={e => setDate({ ...date, userName: e.target.value })} />
      <input type="text" placeholder='Email' onChange={e => setDate({ ...date, email: e.target.value })}/>
      <input type="text" placeholder="Password"  onChange={e => setDate({ ...date, password: e.target.value })}/>
      <button onClick={onSubmit} type="submit">Submit</button>
     </form>
    </>
  )
}

export default App
