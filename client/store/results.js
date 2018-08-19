import axios from 'axios'

// ACTION TYPES

const GOT_RESULTS = 'GOT_RESULTS'

// ACTION CREATORS

const gotResults = (results) => ({
  type: GOT_RESULTS,
  results
})

// THUNK CREATORS

export const getResults = ( code, problemId ) =>
async dispatch => {
  try {
    const { data } = await axios.post('/api/docker', {
      code,
      problemId
    })

    dispatch(gotResults(data))
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
        results: action.results
      }
    }
    default:
      return state
  }
}
