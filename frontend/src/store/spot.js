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

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const deleteSpot = (spot)   => ({
    type: DELETE_SPOT,
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

export const createSpotThunk = (spot, spotImg) => async (dispatch) => {
    const spotResponse = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });
    console.log('spotResponse', spotResponse)
    const imgRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        // body:
    });
    //combine both
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
        };
        case CREATE_SPOT: {
            return newState
        };
        
        case UPDATE_SPOT:{

        }
        case DELETE_SPOT: {
            
        }

        default: 
            return state;
    }
}