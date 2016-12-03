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
import Button from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"

import {List, ListItem} from "material-ui/List"
import ActionInfo from "material-ui/svg-icons/action/info"
import Divider from "material-ui/Divider"
import Subheader from "material-ui/Subheader"
import Avatar from "material-ui/Avatar"
import FileFolder from "material-ui/svg-icons/file/folder"
import ActionAssignment from "material-ui/svg-icons/action/assignment"
import {blue500, teal500, deepOrange500} from "material-ui/styles/colors"
import EditorInsertChart from "material-ui/svg-icons/editor/insert-chart"
import NoteAdd from "material-ui/svg-icons/action/note-add"

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
      currentStation: {},
      files: [],
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

  onMarkerClick = item => {
    // const {name, lat, lng} = item
    // this.setState({selectedIndex: 1})
    this.setState({currentStation: item})
  }

  onUploaded = id => {
    const files = this.state.files
    files.push({filename: id})
    this.setState({files: files})
  }

  onQueueAdded = () => {
    this.setState({selectedIndex: 2})
    const queue = {
      stationId: this.state.currentStation._id, // NOTE: Populate this
      files: this.state.files
    }
    console.log("ENQUEUE", queue)
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
          <div
            style={{position: "absolute", top: "5em", right: "1em", zIndex: 1, marginLeft: "1em"}}
          >
            <Paper className={s.card} zDepth={1}>
              <h2 style={{margin: 0, textAlign: "right"}}>
                {
                  this.state.currentStation.hasOwnProperty("name") ? (
                    <span>
                      <span style={{color: "#7f8c8d"}}>Printing At&nbsp;</span>
                      {this.state.currentStation.name}&nbsp;
                      <small style={{color: "#7f8c8d"}}>
                        ({this.state.currentStation.lat}, {this.state.currentStation.lng})
                      </small>
                    </span>
                  ) : (
                    <span>
                      <span style={{color: "#7f8c8d"}}>Please select a&nbsp;</span>
                      Print Station&nbsp;
                      <span style={{color: "#7f8c8d"}}>to print to.</span>
                    </span>
                  )
                }
              </h2>
              <div onClick={() => this.setState({selectedIndex: 1})} style={{textAlign: "right", marginTop: "1.2em"}}>
                <Button label="Confirm Printer" secondary />
              </div>
            </Paper>
          </div>
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
                  <div
                    key={i}
                    lat={item.lat || 0.0}
                    lng={item.lng || 0.0}
                    onClick={() => this.onMarkerClick(item)}
                  >
                    <div className={s.pin} />
                    <div className={s.pulse} />
                    {item.name}
                  </div>
              )) : null
            }
          </GoogleMap>
        </div>
        <div style={{display: this.state.selectedIndex === 1 ? "block" : "none"}}>
          <Grid style={{paddingTop: "1.5em"}} c>
            <div>
              <Paper className={s.card} zDepth={1}>
                <h2 style={{margin: 0}}>
                  <span style={{color: "#7f8c8d"}}>Files will be uploaded and printed at </span>
                  {this.state.currentStation.name}&nbsp;
                </h2>
                <div onClick={() => this.setState({selectedIndex: 2})} style={{marginTop: "1.2em"}}>
                  <Button label="Proceed" secondary />
                </div>
              </Paper>
            </div>
            <div>
              <Paper className={s.card} zDepth={1}>
                <List>
                  <Subheader inset>Folders</Subheader>
                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    rightIcon={<ActionInfo />}
                    primaryText="Vacation itinerary"
                    secondaryText="Jan 20, 2014"
                  />
                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    rightIcon={<ActionInfo />}
                    primaryText="Kitchen remodel"
                    secondaryText="Jan 10, 2014"
                  />
                </List>
                <Divider inset />
                <List>
                  <Subheader inset>Files</Subheader>
                    {
                      this.state.files.length > 0 ? (
                        this.state.files.map((item, i) => (
                          <ListItem
                            key={i}
                            leftAvatar={
                              <Avatar icon={<ActionAssignment />} backgroundColor={blue500} />
                            }
                            rightIcon={<ActionInfo />}
                            primaryText={`File ${i}`}
                            secondaryText={item.filename}
                          />
                        ))
                      ) : (
                        <ListItem
                          leftAvatar={
                            <Avatar icon={<ActionAssignment />} backgroundColor={deepOrange500} />
                          }
                          rightIcon={<EditorInsertChart />}
                          primaryText={`No Files Yet. Please add one.`}
                          secondaryText="No Files have been added yet. Please add one below."
                        />
                      )
                    }
                  <div>
                    <Upload align="left" result={this.onUploaded}>
                      <ListItem
                        leftAvatar={<Avatar icon={<NoteAdd />} backgroundColor={teal500} />}
                        rightIcon={<ActionInfo />}
                        primaryText={`Upload a File`}
                        secondaryText="Upload a file"
                      />
                    </Upload>
                  </div>
                </List>
              </Paper>
            </div>
            <div className={s.animSlideIn}>
              <Button
                label="Queue Now"
                onClick={this.onQueueAdded}
                style={{marginTop: "1em"}}
                fullWidth secondary
              />
            </div>
          </Grid>
        </div>
        <div style={{display: this.state.selectedIndex === 2 ? "block" : "none"}}>
          <Grid style={{paddingTop: "1em"}} c>
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
          position: "fixed",
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
