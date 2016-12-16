import React, {Component} from "react"
import {connect} from "react-redux"

import withStyles from "isomorphic-style-loader/lib/withStyles"

import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import LocationOn from "material-ui/svg-icons/communication/location-on"

import {services, app, BEACON_API} from "../../constants/api"

import PrintAt from "../../components/PrintAt"
import BottomNav from "../../components/BottomNav"

import s from "./Dashboard.scss"

/*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({center: [position.coords.latitude, position.coords.longitude]})
    }, e => console.error(e))
  } else {
    console.error(false)
  }
*/

export class Dashboard extends Component {

  componentDidMount = () => {
    this.props.findBeacons()
    app.service(BEACON_API).on("created", () => this.props.findBeacons())
    app.service(BEACON_API).on("removed", () => this.props.findBeacons())
  }

  render = () => (
    <div>
      <AppBar
        title="PrintAt"
        style={{position: "fixed"}}
        iconElementRight={<IconButton><LocationOn /></IconButton>}
      />
      <PrintAt />
      <BottomNav />
    </div>
  )

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  findBeacons: () => dispatch(services.beacon.find()),
  removeBeacon: id => dispatch(services.beacon.remove(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
