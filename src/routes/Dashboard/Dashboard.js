import React, {Component} from "react"
import {connect} from "react-redux"

import withStyles from "isomorphic-style-loader/lib/withStyles"

import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import AttachFile from "material-ui/svg-icons/editor/attach-file"
import LocationOn from "material-ui/svg-icons/communication/location-on"
import QueueIcon from "material-ui/svg-icons/av/queue"
import Paper from "material-ui/Paper"
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation"

import Upload from "../../components/Upload"
import Grid from "../../components/Grid"

import GoogleMap from "google-map-react"

import {services, app, BEACON_API} from "../../constants/api"

import s from "./Dashboard.scss"

export class Dashboard extends Component {

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      files: [{
        filename: "9fjaw9ifjw90ajf09waj.pdf"
      }],
      queues: [{
        queue: 451
      }, {
        queue: 452
      }, {
        queue: 453
      }],
      center: [0.0, 0.0]
    }
  }

  componentDidMount = () => {
    app.service(BEACON_API).on("created", () => this.props.findBeacons())
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({center: [position.coords.latitude, position.coords.longitude]})
      }, () => console.error(true))
    } else {
      console.error(false)
    }
  }

  onUploaded = id => {
    const files = this.state.files
    files.push({filename: id})
    this.setState({files: files})
  }

  select = index => this.setState({selectedIndex: index})

  render = () => (
    <div>
      <AppBar
        title="PrintAt"
        iconElementRight={
          <IconButton>
            <LocationOn />
          </IconButton>
        }
      />
      <div>
        <div
          style={{
            display: this.state.selectedIndex === 0 ? "block" : "none",
            overflow: "hidden"
          }}
        >
          <GoogleMap
            apiKey="AIzaSyDZXmkfesaoAhwCwB908D48FtHaBMZGIZ8"
            defaultCenter={[0.0, 0.0]}
            center={this.state.center}
            defaultZoom={this.props.zoom}
            options={() => ({
              gestureHandling: "greedy"
            })}
          >
            {
              this.props.beacon ?
                this.props.beacon.data.map((item, i) => (
                  <div key={i} lat={item.lat || 0.0} lng={item.lng || 0.0}>{item.name}</div>
              )) : null
            }
          </GoogleMap>
        </div>
        <div style={{display: this.state.selectedIndex === 1 ? "block" : "none"}}>
          <Grid style={{paddingTop: "1.5em"}} c>
            <div>
              {
                this.state.files.map((item, i) => (
                  <Paper key={i} className={s.card} zDepth={1}>
                    File Name: {item.filename}
                  </Paper>
                ))
              }
            </div>
            <div className={s.animSlideIn}>
              <Upload result={this.onUploaded} />
            </div>
          </Grid>
        </div>
        <div style={{display: this.state.selectedIndex === 2 ? "block" : "none"}}>
          <Grid style={{paddingTop: "1.5em"}} c>
            <Paper className={s.card} zDepth={1}>
              <h2>Current Queue: 6</h2>
            </Paper>
            <div>
              {
                this.state.queues.map((item, i) => (
                  <Paper key={i} className={s.card} zDepth={1}>
                    {item.queue}
                  </Paper>
                ))
              }
            </div>
          </Grid>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%"
        }}
      >
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Select Stations"
              icon={<LocationOn />}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Upload Files"
              icon={<AttachFile />}
              onTouchTap={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Queues"
              icon={<QueueIcon />}
              onTouchTap={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  user: state.user,
  beacon: state.beacon.queryResult
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  findBeacons: dispatch(services.beacon.find())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
