import axios from 'axios'

// ACTION TYPES

const GOT_RESULTS = 'GOT_RESULTS'

// ACTION CREATORS

const gotResults = results => ({
  type: GOT_RESULTS,
  results
})

// THUNK CREATORS

export const getResults = (code, problemId, userId, points, isChallengeSolved) => async dispatch => {
  try {
    const resultsData = await axios.post('/api/docker', {
      code,
      problemId,
      userId
    })
    if (resultsData.data.stats.passPercent === 100 && !isChallengeSolved) {
      await axios.put(`/api/users/${userId}/progress`, {
        points,
        problemId
      })
      dispatch(gotResults(resultsData.data))
    }
    dispatch(gotResults(resultsData.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default function (state = '', action) {
  switch (action.type) {
    case GOT_RESULTS: {
      return action.results
    }
    default:
      return state
  }
}
