import axios from 'axios'

// ACTION TYPES
const GET_SOLVED_CHALLENGES = 'GET_SOLVED_CHALLENGES'
const GET_CHALLENGE_STATUS = 'GET_CHALLENGE_STATUS'

const getSolvedChallenges = completedChallenges => ({
	type: GET_SOLVED_CHALLENGES,
	completedChallenges
})

const getChallengeStatus = challengeStatus => ({
	type: GET_CHALLENGE_STATUS,
	challengeStatus
})

// THUNK CREATORS
export const getSolvedData = (userId) => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`/api/users/${userId}/challenges`)
			dispatch(getSolvedChallenges(data))
		} catch (err) {
			console.error(err)
		}
	}
}

export const getIsChallengeSolved = (userId, challengeId) => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`/api/users/${userId}/challenges/${challengeId}`)
			dispatch(getChallengeStatus(data))
		} catch (err) {
			console.error(err)
		}
	}
}

// REDUCER
export default function (state = {}, action) {
	switch (action.type) {
		case GET_SOLVED_CHALLENGES: {
			return { ...state, completedChallenges: action.completedChallenges }
		}
		case GET_CHALLENGE_STATUS: {
			return { ...state, challengeStatus: action.challengeStatus }
		}
		default:
			return state
	}
}
