import { csrfFetch } from "./csrf";

const CREATE_REVIEW = "reviews/create"
const READ__SPOT_REVIEW   = "reviews/spot"
const READ_USER_REVIEW = "reviews/user"
const DELETE_REVIEW = 'reviews/delete'


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

const deleteReviews = (review) => ({
    type: DELETE_REVIEW,
    review
})



//thunk 
export const getAllReviewThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
        const reviews = await response.json()
        // console.log("THUNK",reviews)
        dispatch(readSpotReview(reviews))
}

export const createReviewThunk = (newReview, id) => async (dispatch) => {
    // console.log("SPOT ID THUNK", id)
    // console.log("NEW REVIEWS THUNK", newReview)
    const reviewRes = await csrfFetch(`/api/spots/${id}/reviews`, {
         method: 'POST',
         body: JSON.stringify(newReview)
    })
    if(reviewRes.ok) {
        const review = await reviewRes.json();
        console.log("THUNK",review)
        dispatch(createReview(review))
        return review
    }
}
export const deleteReviewThunk = (deleteReview) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${deleteReview}`, {
        method: "DELETE"
    })

    if (res.ok){
        dispatch(deleteReviews(deleteReview))
    }

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
            let newStateCopy = { ...newState.spot}
            console.log("ACTION", action.review.spotId)
            newStateCopy[action.review.id] = action.review
            newState.spot = newStateCopy
            return newState
        }

        case READ__SPOT_REVIEW: {
            newState = { spot:{}, user: {}};
            // console.log("ACTION", action)
            action.reviews.Reviews.forEach( review => {
                newState.spot[review.id] = review
            });
            return newState
        }
        case READ_USER_REVIEW: {

        }

        case DELETE_REVIEW: {

        }

        default:
            return state;
    }

}