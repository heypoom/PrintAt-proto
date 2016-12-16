import {SET_STATION, ADD_FILE, SET_SECTION} from "../constants/app"

export default (state = {}, {type, payload}) => {
  switch (type) {
    case SET_STATION:
      return {
        ...state,
        station: payload
      }
    case ADD_FILE:
      return {
        ...state,
        files: [].concat(state.files || []).concat(payload)
      }
    case "CLEAR_FILES":
      return {
        ...state,
        files: []
      }
    case SET_SECTION:
      return {
        ...state,
        section: payload
      }
    default:
      return state
  }
}
