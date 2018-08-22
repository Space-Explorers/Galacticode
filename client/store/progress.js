import axios from 'axios'

//ACTION TYPES
const GOT_PROGRESS = 'GOT_PROGRESS'
const RESET_FUEL = 'RESET_FUEL'

//ACTION CREATORS
const gotProgress = progress => ({
  type: GOT_PROGRESS,
  progress
})

const resetFuel = () => ({
  type: RESET_FUEL
})

//THUNK CREATORS
export const getProgressData = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/progress`)
      dispatch(gotProgress(data.progress))
    } catch (err) {
      console.error(err)
    }
  }
}

export const resetFuelBar = () => {
  return dispatch => {
    try {
      dispatch(resetFuel())
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER
export default function(state = 0, action) {
  switch (action.type) {
    case GOT_PROGRESS: {
      return action.progress
    }
    case RESET_FUEL: {
      return 0
    }
    default:
      return state
  }
}
