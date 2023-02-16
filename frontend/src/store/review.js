import { csrfFetch } from "./csrf";

const CREATE_REVIEW = "reviews/create"
const READ__SPOT_REVIEW   = "reviews/spot"
const READ_USER_REVIEW = "reviews/user"
const UPDATE_REVIEW = 'reviews/update'


const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const readSpotReview = (reviews) => ({
    type: READ__SPOT_REVIEW,
    reviews
})

const readUserReview = (userReview) => ({
    type: READ_USER_REVIEW,
    userReview
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})



//thunk 
export const getAllReviewThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
        const reviews = await response.json()
        // console.log("THUNK",reviews)
        dispatch(readSpotReview(reviews))
}


//initial state
const initialState = {
    spot: {},
    user: {}
}

export default function reviewReducer (state = initialState, action){
    let newState = {...state}
    switch (action.type){
        case CREATE_REVIEW: {

        }

        case READ__SPOT_REVIEW: {
            newState = { spot:{}, user: {}};
            console.log("ACTION", action)
            action.reviews.Reviews.forEach( review => {
                newState.spot[review.id] = review
            });
            return newState
        }
        case READ_USER_REVIEW: {

        }

        case UPDATE_REVIEW: {

        }

        default:
            return state;
    }

}