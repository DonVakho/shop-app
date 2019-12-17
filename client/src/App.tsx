//React Imports
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//Custom Component Imports
import Home from './components/home/Home'

const App: React.FC = () => (
  <Router>
    <Route path="/" exact component={Home} />
  </Router>
)

export default App