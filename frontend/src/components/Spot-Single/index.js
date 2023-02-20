import { useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, singleSpotThunk } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import  EditSpot from '../Spot-Edit'
import GetSpotReviews from "../Review-read";
import CreateReview from "../Create-Review";
import DeleteSpot from "../Spot-delete";
// import { deleteReviewThunk } from "../../store/review";
import './Spot.css'

function SpotSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();
    const singleSpot = useSelector((state) => state.Spots.singleSpot)
    const reviews = useSelector((state) => state.Reviews.spot)
    const userSession = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviews)

    // console.log('SPOT INFO',[singleSpot.Owner])

    const ownerInfo = singleSpot.Owner
    const userReview = reviewsArr.find(review => review.userId === userSession.id);

 

    let starRating = 0;

    if (reviewsArr.length > 0){
        reviewsArr.forEach(count => {
            starRating += count.stars
        })

        starRating = starRating / reviewsArr.length
    }


    // console.log("OWNER",ownerInfo.firstName)

    useEffect(() => {
        dispatch(singleSpotThunk(id))
    },[dispatch, id])

    if(!singleSpot) return <h1> Spot does not Exists</h1>

    return (
        
        <div className="spotdetails">
            <div className="header">
            <div className="Spot-name">
            <h1>{singleSpot.name}</h1>
            <p>{singleSpot.city}, {singleSpot.state}</p>
            </div>
            </div>
               <div className="spot-images">
                   {singleSpot?.SpotImages?.map(img => {
                       return <img id="spotimages" src={img.url} alt={singleSpot.name}/>
       
                   })}
                   <span>
                    Entire Home Hosted by {ownerInfo?.firstName}
                   </span>
            <div className="buttons">
           <div className="Edit-button">
           <OpenModalButton 
            modalComponent={<EditSpot />}
            buttonText={"Edit This Spot"}
            />
            </div>
            <div className="Delete-Button">
           <OpenModalButton 
            modalComponent={<DeleteSpot />}
            buttonText={"Delete This Spot"}
            />
            </div>
            
            </div>       
                <div className="description">
                <p className="single-review-rating">Average Rating: {starRating.toFixed(2)}</p>
                <p className="address">Located in: {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                <p className="spot-description">{singleSpot.description} </p>
                </div>
                <div className="ratingline">
                <div>
                    <GetSpotReviews />
                </div>

                
                {!userReview && (
                    <div className="add-review">
                        <OpenModalButton
                            modalComponent={<CreateReview />}
                            buttonText={"ADD NEW REVIEW"}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default SpotSingle;