import { csrfFetch} from './csrf'

const LOAD_SPOTS = "spots/LOAD_SPOTS"
const SINGLE_SPOT = 'spots/SINGLE_SPOT'

const getSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const singleSpot = (spots) => ({
    type: SINGLE_SPOT,
    spots
})

//thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');
        const spots = await response.json();
        dispatch(getSpots(spots))
   
}

export const singleSPotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch('api/:spotId');
    const singleSpotfetch = await response.json();
    dispatch(singleSpot(singleSpotfetch))
}

//initial state
const initialState = {
    allSpots: {},
    singleSpot: {}
}

//reducer 

export default function spotReducer (state = initialState, action) {
    let newState = {...state}
    switch (action.type){
        case LOAD_SPOTS: {
            newState = {allSpots:{}, singleSpot:{}};
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            });
            return newState
        };
        case SINGLE_SPOT: {

        }

        default: 
            return state;
    }
}