import { csrfFetch } from "./csrf";

const CREATE_REVIEW = "reviews/create"
const READ_REVIEW   = "reviews/read"
const UPDATE_REVIEW = 'reviews/update'


const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const readReview = (reviews) => ({
    type: READ_REVIEW,
    reviews
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})



//thunk 



//initial state
const initialState = {
    reviews: {}
}

export default function reviewReducer (state = initialState, action){
    let newState = {...state}
    switch (action.type){
        case CREATE_REVIEW: {

        }

        case READ_REVIEW: {

        }

        case UPDATE_REVIEW: {

        }

        default:
            return state;
    }

}