import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginSignUp from './pages/LoginSignUp'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginSignUp/>}/>
     </Routes>
    </>
  )
}

export default App
