import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import GoogleMap from "google-map-react"

import s from "../routes/Dashboard/Dashboard.scss"

import {MapsAPIKey} from "../constants"
import {setStation, setSection} from "../actions/app"

const LocatorCard = withStyles(s)(props => (
  <div className={s.fixedCard}>
    <Paper className={c(s.card, s.animSlideIn)} zDepth={1}>
      <h2 className={s.fixedCardHeading}>
        {
          props.station ? (
            <span>
              <span style={{color: "#7f8c8d"}}>Printing At&nbsp;</span>
              {props.station.name}&nbsp;
              <small style={{color: "#7f8c8d"}}>
                ({props.station.lat}, {props.station.lng})
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
      <div onClick={props.next} style={{textAlign: "right", marginTop: "1.2em"}}>
        <Button label="Confirm Printer" secondary />
      </div>
    </Paper>
  </div>
))

const MapPin = withStyles(s)(({onClick, name, lat, lng, _id}) => (
  <div onClick={() => onClick({name, lat, lng, _id})}>
    <div className={s.pin} />
    <div className={s.pulse} />
    {name}
  </div>
))

const mapsOptions = () => ({gestureHandling: "greedy"})

const LocatorMap = props => (
  <div style={{overflow: "hidden"}}>
    <LocatorCard station={props.station} next={props.next} />
    <GoogleMap
      bootstrapURLKeys={MapsAPIKey}
      defaultCenter={[13.7389953, 100.5885519]}
      center={props.center}
      defaultZoom={9}
      options={mapsOptions}
    >
      {
        props.beacon && props.beacon.data.map((item, i) => (
          <MapPin
            key={i}
            _id={item._id}
            lat={item.lat}
            lng={item.lng}
            name={item.name}
            onClick={props.onMarkerClick}
          />
        ))
      }
    </GoogleMap>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  beacon: state.beacon.queryResult,
  station: state.app.station
})

const mapDispatchToProps = dispatch => ({
  onMarkerClick: loc => dispatch(setStation(loc)),
  next: () => dispatch(setSection(1)),
  findBeacons: () => dispatch(services.beacon.find()),
  removeBeacon: id => dispatch(services.beacon.remove(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocatorMap)
