import axios from 'axios'

// ACTION TYPES
const GET_USER_CHALLENGES = 'GET_USER_CHALLENGES'

// ACTION CREATORS
// const gotChallenge = challenge => ({
//   type: GOT_CHALLENGE,
//   challenge
// })

const getUserChallenges = user => ({
	type: GET_USER_CHALLENGES,
	user
})

// THUNK CREATORS
export const getUserChallengesData = (userId) => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`/api/users/${userId}/challenges`)
			dispatch(getUserChallenges(data))
		} catch (err) {
			console.error(err)
		}
	}
}

// REDUCER
export default function (state = {}, action) {
	switch (action.type) {
		case GET_USER_CHALLENGES: {
			return action.user
		}
		default:
			return state
	}
}
