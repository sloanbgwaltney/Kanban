import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import classNames from 'classnames'
import When from './When'
import OtherwiseWhen from './OtherwiseWhen';
import Otherwise from './Otherwise'

function Navbar () {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [dropdownActive, setDropdownActive] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">Kanban Pro</Link>

        <span role="button" className={classNames({ "navbar-burger": true, 'is-active': dropdownActive })} aria-label="menu" aria-expanded="false" data-target="navbar" onClick={() => setDropdownActive(!dropdownActive)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>

      </div>
      <div id="navbar" className={classNames({ "navbar-menu": true, 'is-active': dropdownActive })}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <OtherwiseWhen>
                <When condition={loading}>
                  <button className="is-loading is-primary"></button>
                </When>
                <When condition={user}>
                  <button className="button is-light">Logout</button>
                  <Link to="/profile">Hello {user?.displayName}</Link>
                </When>
                <Otherwise>
                  <button className="button is-light" ><Link to="/register">Sign Up</Link></button>
                  <button className="button is-primary">Login</button>
                </Otherwise>
              </OtherwiseWhen>
            </div>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar