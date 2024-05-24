import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import home from './home/home'
import Login from './Login/Login'
import Register from './Register/Register'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
