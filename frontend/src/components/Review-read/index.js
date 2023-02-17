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
    const reviewsArr = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getAllReviewThunk(id))
        // console.log("DISPATH ID", id)
    }, [dispatch, id])

    // console.log("SPOT ID", id)
    // console.log("SPOT", spot);
    // console.log("REVIEWS ARR", reviewsArr)
    // console.log("REVIEWS", reviewsObj)

    if (!reviewsObj) return <h1>No reviewsObj</h1>

    return (
        <div className="MainReviewDiv">
            {reviewsArr.map(({id, review, stars}) => {
                return (
                    <div key={id} className="reviewId">
                        <p>Reviews: {review}</p>
                        <p>Stars: {stars}</p>
                        <button className="DeleteReviewButton"
                        onClick={async () => {
                            // console.log("REVIEWS THUNK",id)
                            await dispatch(deleteReviewThunk(id))
                            // .then(() => dispatch(singleSpotThunk(spot.id)))
                            .then(() => dispatch(getAllReviewThunk(spot.id)))
                        }}
                        >
                            DELETE REVIEW
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default GetSpotReviews;