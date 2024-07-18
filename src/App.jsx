import React from 'react'
import Login from './components/Login'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AuthorManagement from './components/AuthorManagement'
import BookManagement from './components/BookManagement'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/books" element={<BookManagement />} />
          <Route path="/authors" element={<AuthorManagement />} />

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
