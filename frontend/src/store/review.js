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
        // console.log("THUNK",review)
        dispatch(createReview(review))
        return review
    }
}
export const deleteReviewThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })

    if (res.ok){
        const data = await res.json()
        // console.log("THUNK DELETE", data)
        dispatch(deleteReviews(data))
        return data
    }

}

//initial state
const initialState = {
    spot: {}
}

export default function reviewReducer (state = initialState, action){
    let newState = {...state}
    switch (action.type){
        case CREATE_REVIEW: {
            let newStateCopy = { ...newState.spot}
            // console.log("ACTION", action.review.spotId)
            newStateCopy[action.review.id] = action.review
            newState.spot = newStateCopy
            return newState
        }

        case READ__SPOT_REVIEW: {
            newState = { spot:{}};
            // console.log("ACTION", action)
            action.reviews.Reviews.forEach( review => {
                newState.spot[review.id] = review
            });
            return newState
        }
        case READ_USER_REVIEW: {

        }

        case DELETE_REVIEW: {
            newState.spot = { ...state.spot}
            // console.log("ACTION", action)
            delete newState.spot[action.review.id]
            return newState
        }

        default:
            return state;
    }

}