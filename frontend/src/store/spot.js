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

export const createSpotThunk = (newSpot) => async (dispatch) => {
    console.log("NEW SPOT", newSpot)
    const spotResponse = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(newSpot)
    });

    if (spotResponse.ok) {
    const createNewSpot = await spotResponse.json();
    const imgRes = await csrfFetch(`/api/spots/${createNewSpot.id}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url: newSpot.SpotImages,
            preview: true
        })
    })

    if(imgRes.ok) {
        const imgData = await imgRes.json();
        const combineData = {previewImage: imgData.url, ...createNewSpot}
        dispatch(createSpot(combineData))
        return combineData
    }
    }
}

export const deleteSpotThunk = (spot) => async (dispatch) => {
    const deleteRes = await csrfFetch(`/api/spots/${spot}`, {
        method: "DELETE"
    })

    if(deleteRes.ok){
        dispatch(deleteSpot(spot))
    }
}

export const updateSpotThunk = (currSpot, editedSPot) => async (dispatch) => {
    const editResponse = await csrfFetch(`/api/spots/${currSpot.id}`, {
        method: 'PUT',
        body: JSON.stringify(editedSPot)
    })

    if(editResponse.ok){
        const data = await editResponse.json();
        // console.log(" DATA RES", data)
        dispatch(updateSpot(data))
        return data
    }
    // console.log("EDIT RESPONSE", editResponse)
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
            let newStateCopy = {...newState.allSpots}
            newStateCopy[action.spot.id] = action.spot
            newState.allSpots = newStateCopy
            return newState
        };
        
        case UPDATE_SPOT:{
            let spotCopy = {...state.singleSpot, ...action.spot}
            // console.log(spotCopy)
            return {...state, singleSpot: spotCopy}
           
        }
        case DELETE_SPOT: {
            newState.allSpots = {...state.allSpots}
            delete newState.allSpots[action.spotId]
            return newState
        }

        default: 
            return state;
    }
}