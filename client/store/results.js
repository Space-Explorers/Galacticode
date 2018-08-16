import axios from 'axios'

// ACTION TYPES

const GOT_RESULTS = 'GOT_RESULTS'

// ACTION CREATORS

const gotResults = (results, challengeStatus) => ({
  type: GOT_RESULTS,
  results,
  challengeStatus
})

// THUNK CREATORS

export const getResults = (
  code,
  problemId,
  userId,
  points
) => async dispatch => {
  try {
    const resultsData = await axios.post('/api/docker', {
      code,
      problemId,
      userId
    })
    const challengeStatus = await axios.get(
      `/api/users/${userId}/challenges/${problemId}`
    )
    if (resultsData.data.stats.passPercent === 100 && !challengeStatus.data) {
      await axios.put(`/api/users/${userId}/progress`, {
        points,
        problemId
      })
    }
    dispatch(gotResults(resultsData.data, challengeStatus.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_RESULTS: {
      return {
        ...state,
        results: action.results,
        challengeStatus: action.challengeStatus
      }
    }
    default:
      return state
  }
}
