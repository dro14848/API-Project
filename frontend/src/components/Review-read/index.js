import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { deleteReviewThunk, getAllReviewThunk } from "../../store/review";
import { useParams } from "react-router-dom";
import { singleSpotThunk } from "../../store/spot";
import './Review.css'



function GetSpotReviews() {
    //need spot ID
    //need single spot state
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector((state) => state.Spots.singleSpot)
    const reviewsObj = useSelector((state) => state.Reviews.spot)
    const userSession = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getAllReviewThunk(id))
        // console.log("DISPATH ID", id)
    }, [dispatch, id])

    // const handleDelete = {
    //     await dispatch(deleteReviewThunk)
    // }
    // console.log("SPOT ID", id)
    // console.log("SPOT", spot);
    // console.log("REVIEWS ARR", reviewsArr)
    // console.log("REVIEWS", reviewsObj)

    if (!reviewsObj) return <h1>No reviewsObj</h1>

    return (
        <div className="MainReviewDiv">
            {reviewsArr.map(({id, review, stars, userId}) => {
                return (
                    <div key={id} className="reviewId">
                        <p>Review: {review}</p>
                        <p className="review-rating">Stars: {stars}</p>
                        {userSession?.id === userId ? 
                        <button className="DeleteReviewButton"
                        onClick={async () => {
                            console.log("REVIEWS THUNK",userId)
                            await dispatch(deleteReviewThunk(id))
                            // .then(() => dispatch(singleSpotThunk(spot.id)))
                            .then(() => dispatch(getAllReviewThunk(spot.id)))
                        }}
                        >
                            DELETE REVIEW
                        </button>: null}
                    </div>
                )
            })}
        </div>
    )
}

export default GetSpotReviews;