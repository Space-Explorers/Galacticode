import axios from 'axios'

// ACTION TYPES

const GOT_RESULTS = 'GOT_RESULTS'

// ACTION CREATORS

const gotResults = results => ({
  type: GOT_RESULTS,
  results
})

// THUNK CREATORS

export const getResults = (userCode, problemId, userId) => async dispatch => {
  try {
    const {data} = await axios.get('/api/docker/')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default function(state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}
