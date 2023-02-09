import { csrfFetch} from './csrf'

const LOAD_SPOTS = "spots/LOAD_SPOTS"
const SINGLE_SPOT = 'spots/SINGLE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

const getSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const singleSpot = (spot) => ({
    type: SINGLE_SPOT,
    spot
})

//thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');
        const spots = await response.json();
        dispatch(getSpots(spots))
   
}

export const singleSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    // console.log(spotId)
    const singleSpotFetch = await response.json();
    dispatch(singleSpot(singleSpotFetch))
    return response

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
            // newState = {};
            newState.singleSpot = action.spot;
            return newState;
        }

        default: 
            return state;
    }
}