// ACTION TYPES
const SET_CURR_CODE = 'SET_CURR_CODE'
const GET_CURR_CODE = 'GET_CURR_CODE'

// ACTION CREATORS
export const setCurrCode = (challengeId, code) => ({
  type: SET_CURR_CODE,
  challengeId,
  code
})

export const getCurrCode = (challengeId) => ({
  type: GET_CURR_CODE,
  challengeId
})

// THUNK CREATORS
export const setCurrentCode = (challengeId, code) => {
  return dispatch => {
    try {
      dispatch(setCurrCode(challengeId, code))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCurrentCode = () => {
  return dispatch => {
    try {
      dispatch(getCurrCode())
    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURR_CODE: {
      return {
        ...state,
        challengeId: action.challengeId,
        code: action.code
      }
    }
    case GET_CURR_CODE: {
      return {...state}
    }
    default:
      return state
  }
}
