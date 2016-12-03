import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {ROLE} from "../constants"

import {services} from "../constants/api"

const Dashboard = props => (
  <div>
    <div>
      ...
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  class: state.class.queryResult
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  find: () => dispatch(services.class.find())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
