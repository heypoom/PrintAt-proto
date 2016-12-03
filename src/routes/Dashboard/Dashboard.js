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

import s from "./Dashboard.scss"

export class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      stations: [{
        name: "Allahu Akbar"
      }, {
        name: "Allahu Snackbar"
      }],
      files: [{
        filename: "9fjaw9ifjw90ajf09waj.pdf"
      }],
      queues: [{
        queue: 451
      }, {
        queue: 452
      }, {
        queue: 453
      }]
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
      <Grid style={{paddingTop: "1.5em"}} c>
        <div style={{display: this.state.selectedIndex === 0 ? "block" : "none"}}>
          {
            this.state.stations.map((item, i) => (
              <Paper key={i} className={s.card} zDepth={1}>
                {item.name}
              </Paper>
            ))
          }
        </div>
        <div style={{display: this.state.selectedIndex === 1 ? "block" : "none"}}>
          <div>
            {
              this.state.files.map((item, i) => (
                <Paper key={i} className={s.card} zDepth={1}>
                  File Name: {item.filename}
                </Paper>
              ))
            }
          </div>
          <Upload result={this.onUploaded} />
        </div>
        <div style={{display: this.state.selectedIndex === 2 ? "block" : "none"}}>
          <div>
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
          </div>
        </div>
      </Grid>
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
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
