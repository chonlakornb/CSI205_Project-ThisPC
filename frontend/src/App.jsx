import {HashRouter, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Layout from "./Layouts/layout/layout.jsx";
import Home from './pages/home/home.jsx';

import './App.css'
import Layouts from './Layouts/layout/layout.jsx';

const intTab = 'home';

function App() {
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(intTab)
  },[])

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route element={<Layouts/>}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}


export default App
