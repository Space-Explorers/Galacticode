import axios from 'axios'

// ACTION TYPES
const GOT_CHALLENGE = 'GOT_CHALLENGE'
const REMOVED_CHALLENGE = 'REMOVED_CHALLENGE'

// ACTION CREATORS
const gotChallenge = challenge => ({
  type: GOT_CHALLENGE,
  challenge
})

const removedChallenge = () => ({
  type: REMOVED_CHALLENGE
})

// THUNK CREATORS
export const getChallengeData = challengeId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/challenges/${challengeId}`)
      dispatch(gotChallenge(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeChallengeData = () => {
  return dispatch => {
    try {
      dispatch(removedChallenge())
    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_CHALLENGE: {
      return action.challenge
    }
    case REMOVED_CHALLENGE: {
      return {}
    }
    default:
      return state
  }
}
