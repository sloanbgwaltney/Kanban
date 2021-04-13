import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'

function AppRouter () {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
