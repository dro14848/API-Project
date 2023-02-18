import { useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, singleSpotThunk } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import  EditSpot from '../Spot-Edit'
import GetSpotReviews from "../Review-read";
import CreateReview from "../Create-Review";
import { deleteReviewThunk } from "../../store/review";
import './Spot.css'

function SpotSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();
    const singleSpot = useSelector((state) => state.Spots.singleSpot)
    const reviews = useSelector((state) => state.Reviews.spot)
    const reviewsArr = Object.values(reviews)



      useEffect(() => {
        dispatch(singleSpotThunk(id))
    },[dispatch, id])

    if(!singleSpot) return <h1> Spot does not Exists</h1>

    return (
        
        <div className="spotdetails">
            <h1 className="name">{singleSpot.name}</h1>
           <div className="Edit-button">
           <OpenModalButton 
        modalComponent={<EditSpot />}
        buttonText={"Edit This Spot"}
            />
    
           </div>
            <button className="delete-button"
            onClick={async () => {
                await dispatch(deleteSpotThunk(singleSpot.id))
                .then(history.push('/'))
            }}
            >
            Delete This Spot
            </button> 
                <div className="spot-images">
                    {singleSpot?.SpotImages?.map(img => {
                        return <img id="spotimages" src={img.url} alt={singleSpot.name}/>

                    })}
            <div className="ratingline">
                <div>
                    <GetSpotReviews />
                   
                </div>
                <div>
                    <OpenModalButton
                    modalComponent={<CreateReview/>}
                    buttonText={"ADD NEW REVIEW"}
                    />
                </div>
            <p className="single-review-rating">Average Rating: {singleSpot.avgStarRating}</p>
            <p className="address">Address: {singleSpot.address}, {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                </div>
            </div>
        </div>
    )
}

export default SpotSingle;