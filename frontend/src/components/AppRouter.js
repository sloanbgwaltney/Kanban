import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BoardList from '../pages/BoardList'
import Register from '../pages/Register'
import Navbar from './Navbar'

function AppRouter () {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/boards" component={BoardList}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
