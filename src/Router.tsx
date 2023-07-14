import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Coins from './routes/Coins'
import Coin from './routes/Coin'

// interface IRouterProps {}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
        {/* <Route path={`/:coinId/price`} > */}
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router