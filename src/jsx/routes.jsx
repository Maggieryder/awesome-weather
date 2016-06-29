import React from 'react'
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import Shell from 'Shell'
import Weather from 'Weather'
import Users from './views/users.jsx'
import User from './views/user.jsx'
import NoMatch from './views/404.jsx'

const Routes = (
  <Router history={appHistory}>
    <Route name="Home" path="/" component={Shell} >
      <IndexRoute name="Home" component={Weather} />
      <Route name="Users" path="users" component={Users}>
        <Route name="User" path=":id" component={User} />
      </Route>
      <Route name="Not Found" path="/*" component={NoMatch} />
    </Route>
  </Router>
)

export default Routes
