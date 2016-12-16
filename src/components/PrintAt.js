import React from "react"
import {connect} from "react-redux"

import LocatorMap from "./LocatorMap"
import DocumentUpload from "./DocumentUpload"
import PrintQueue from "./PrintQueue"

const PrintAt = props => (
  <div>
    <div style={{display: props.section === 0 ? "block" : "none"}}>
      <LocatorMap />
    </div>
    <div style={{display: props.section === 1 ? "block" : "none"}}>
      <DocumentUpload />
    </div>
    <div style={{display: props.section === 2 ? "block" : "none"}}>
      <PrintQueue />
    </div>
  </div>
)

const mapStateToProps = state => ({
  section: state.app.section
})

export default connect(mapStateToProps)(PrintAt)
