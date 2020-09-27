import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import MainPage from './pages/main'
import AuthPage from './pages/auth'
import NotFoundPage from './pages/404'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

const App: React.FC = () => { 

  return (
    <ThemeProvider>
      <CSSReset />
      <Router>
        <Switch>
          <PrivateRoute exact path='/'>
            <MainPage />
          </PrivateRoute>
          <Route path='/auth' component={AuthPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </ThemeProvider> 
  )
}

export default App
