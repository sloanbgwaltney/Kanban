import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Navbar from './Navbar'

function AppRouter () {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
