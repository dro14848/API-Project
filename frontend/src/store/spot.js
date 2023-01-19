import { csrfFetch} from './csrf'

const LOAD_SPOTS = "spots/LOAD_SPOTS"

const getAllspots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})


//thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllspots(data))
        return data;
    }

}

//initial state
const initialState = {}

//reducer 

export default function spotReducer (state = initialState, action) {
    switch (action.type){
        case LOAD_SPOTS: {
            let newState = {...state};
            action.spots.Spots.forEach((spot) => {
                newState.spots[spot.id] = spot
            })
            console.log(newState)
            return newState
        }
        default: 
        return state
    }
}