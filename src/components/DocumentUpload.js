import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
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

import Upload from "./Upload"
import Grid from "./Grid"

import {services} from "../constants/api"
import {setSection, addFile, setStation} from "../actions/app"

import s from "../routes/Dashboard/Dashboard.scss"

const DocumentList = props => (
  <List>
    <Subheader inset>Files</Subheader>
      {
        props.files.length > 0 ? (
          props.files.map((item, i) => (
            <ListItem
              key={i}
              leftAvatar={
                <Avatar icon={<ActionAssignment />} backgroundColor={blue500} />
              }
              rightIcon={<ActionInfo />}
              primaryText={`File ${i}`}
              secondaryText={item}
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
      <Upload align="left" result={props.onUploaded}>
        <ListItem
          leftAvatar={<Avatar icon={<NoteAdd />} backgroundColor={teal500} />}
          rightIcon={<ActionInfo />}
          primaryText={`Upload a File`}
          secondaryText="Upload a file"
        />
      </Upload>
    </div>
  </List>
)

const DocumentUpload = props => (
  <div>
    <Grid style={{paddingTop: "5.5em"}} c>
      <Paper className={s.animSlideIn} zDepth={1}>
        <div style={{background: "#2196f3", padding: "0.8em", color: "white"}}>
          Print Overview
        </div>
        <div className={s.card}>
          <h2 style={{margin: 0}}>
            <span style={{color: "#7f8c8d"}}>
              Files will be uploaded and printed at&nbsp;
            </span>
            {props.station && props.station.name}
          </h2>
          <div
            style={{marginTop: "1.2em"}}
            onClick={() => props.addToQueue(props.files || [], props.station)}
          >
            <Button label="Add To Print Queue" disabled={!props.files} secondary />
          </div>
        </div>
      </Paper>
      <Paper className={s.animSlideIn} zDepth={1}>
        <div style={{background: "#2196f3", padding: "0.8em", color: "white"}}>
          File Upload
        </div>
        <div className={s.card}>
          <DocumentList files={props.files || []} onUploaded={props.onUploaded} />
        </div>
      </Paper>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  section: state.app.section,
  files: state.app.files,
  station: state.app.station
})

const mapDispatchToProps = dispatch => ({
  addToQueue: (files, station) => {
    if (station && files.length > 0) {
      dispatch(setSection(2))
      dispatch(services.print.create({station: station._id, files}))
      setTimeout(() => {
        swal("Print Success!", "", "success")
        dispatch(setSection(0))
        dispatch(setStation(null))
        dispatch({type: "CLEAR_FILES"})
      }, 5000)
    } else if (!station) {
      dispatch(setSection(0))
      swal("กรุณาเลือกสถานที่ปรินท์ก่อน", "", "error")
    } else if (!files || files.length === 0) {
      swal("กรุณาอัพโหลดไฟล์ก่อน", "", "error")
    }
  },
  onUploaded: id => {
    dispatch(addFile(id))
    swal("Upload Finished", "Upload Success", "success")
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(DocumentUpload))
