import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import Grid from "./Grid"

import s from "../routes/Dashboard/Dashboard.scss"

const PrintQueue = withStyles(s)(props => (
  <div>
    <Grid style={{paddingTop: "5.5em"}} c>
      <Paper className={s.animSlideIn} zDepth={1}>
        <div style={{background: "#2196f3", padding: "0.8em", color: "white"}}>
          Printing Summary
        </div>
        <div className={s.card}>
          {props.station ? (
            <h2 style={{color: "#7f8c8d"}}>
              Currently Printing At:&nbsp;
              <span style={{color: "black"}}>
                {props.station.name}
              </span>&nbsp;
              <span>
                ({props.station.lat}, {props.station.lng})
              </span>
              <br /><br />
              Files Count: {props.files.length}&nbsp;
            </h2>
          ) : (
            <h2>Please select a Print Station first.</h2>
          )}
        </div>
      </Paper>
      {props.print && (
        <Paper zDepth={1}>
          <div style={{background: "#2196f3", padding: "0.8em", color: "white"}}>
            Queue Information
          </div>
          <div className={s.card}>
            {props.print.error && (
              <h2 style={{margin: 0}}>Error: {props.print.error}</h2>
            )}
            <h2 style={{margin: 0}}>Queue: {props.print.queue}</h2>
            <h3>Queue ID: {props.print.queueId}</h3>
          </div>
        </Paper>
      )}
    </Grid>
  </div>
))

const mapStateToProps = state => ({
  section: state.app.section,
  station: state.app.station,
  files: state.app.files || [],
  print: state.print.data
})

const mapDispatchToProps = dispatch => ({
  // ...
})

export default connect(mapStateToProps, mapDispatchToProps)(PrintQueue)
