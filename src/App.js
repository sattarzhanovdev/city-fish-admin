import React from 'react'
import axios from 'axios'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { Pages } from './pages'
import { Components } from './components'
import * as firebase from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './firebase'


axios.defaults.baseURL = 'https://city-fish-default-rtdb.asia-southeast1.firebasedatabase.app'
const app = firebase.initializeApp(firebaseConfig)
export const storage = getStorage(app);

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
          path='/more/'
          element={<Pages.More />}
        />
        <Route 
          path='/products/'
          element={<Pages.Products />}
        />
        <Route 
          path='/add/'
          element={<Pages.Add />}
        />
        <Route 
          path='/success/'
          element={<Pages.Success />}
        />
        <Route 
          path='/declined/'
          element={<Pages.Declined />}
        />
        <Route 
          path='/edit/:id'
          element={<Pages.Edit />}
        />
      </Routes>
    </div>
  )
}

export default App