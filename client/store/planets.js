import axios from 'axios'

// ACTION TYPES
const GOT_PLANET = 'GOT_PLANET'
const GOT_PLANETS = 'GOT_PLANETS'
const GOT_UNLOCKED_PLANETS = 'GOT_UNLOCKED_PLANETS'

// ACTION CREATORS
const gotPlanet = planet => ({
  type: GOT_PLANET,
  planet
})

const gotPlanets = allPlanets => ({
  type: GOT_PLANETS,
  allPlanets
})

const gotUnlockedPlanets = unlockedPlanets => ({
  type: GOT_UNLOCKED_PLANETS,
  unlockedPlanets
})

// THUNK CREATORS
export const getPlanetChallenges = planetId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/planets/${planetId}/challenges`)
      dispatch(gotPlanet(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getAllPlanets = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/planets')
      dispatch(gotPlanets(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getUnlockedPlanets = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/planets`)
      dispatch(gotUnlockedPlanets(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_PLANET: {
      return {...state, planetChallenges: action.planet}
    }
    case GOT_PLANETS: {
      return {...state, allPlanets: action.allPlanets}
    }
    case GOT_UNLOCKED_PLANETS: {
      return {...state, unlockedPlanets: action.unlockedPlanets}
    }
    default:
      return state
  }
}
