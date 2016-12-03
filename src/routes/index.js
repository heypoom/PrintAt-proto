import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import NotFound from "./NotFound"
import Dashboard from "./Dashboard"
// import Home from "./Home"

const mapState = state => ({user: state.user})

const MatchWhenAuthorized = connect(mapState)(({component: Component, alt: Alt, user, ...rest}) => (
  <Match
    {...rest}
    render={props => {
      const Unregistered = Alt ? <Alt {...props} /> : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
      return typeof user.username === "string" ?
        <Component {...props} />
      : Unregistered
    }}
  />
))

export default () => (
  <div>
    <Match exactly pattern="/" component={Dashboard} />
    <Miss component={NotFound} />
  </div>
)
