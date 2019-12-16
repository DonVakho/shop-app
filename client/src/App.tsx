import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/home/Home'
import backgroundImage from './assets/background.png'

const App: React.FC = () => (
  <div style={{backgroundImage: backgroundImage}}>
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
    </div>
)

export default App