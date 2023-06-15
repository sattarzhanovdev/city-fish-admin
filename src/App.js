import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { Pages } from './pages'
import { Components } from './components'

axios.defaults.baseURL = 'https://city-fish-default-rtdb.asia-southeast1.firebasedatabase.app'

const App = () => {
  return (
    <div>
      <Components.Sidebar />
      <Routes>
        <Route 
          path='/'
          element={<Pages.Main />}
        />
        <Route 
          path='/more/:id'
          element={<Pages.More />}
        />
      </Routes>
    </div>
  )
}

export default App