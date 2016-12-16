import {SET_STATION, ADD_FILE, SET_SECTION} from "../constants/app"

export const setStation = station => ({
  type: SET_STATION,
  payload: station
})

export const addFile = file => ({
  type: ADD_FILE,
  payload: file
})

export const setSection = sect => ({
  type: SET_SECTION,
  payload: sect
})
