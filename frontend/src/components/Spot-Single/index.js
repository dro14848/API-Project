import { useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, singleSpotThunk } from "../../store/spot";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { useModal } from "../../context/Modal";
import  EditSpot from '../Spot-Edit'

// import './Spots.css'

function SpotSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();
    const singleSpot = useSelector((state) => state.Spots.singleSpot)



      useEffect(() => {
        dispatch(singleSpotThunk(id))
    },[dispatch, id])

    if(!singleSpot) return <h1> Spot does not Exists</h1>

    return (
        
        <div className="spotdetails">
            <h1 className="name">{singleSpot.name}</h1>
           <div className="Edit-button">
             <OpenModalMenuItem
            className='Edit-Button'
            itemText={"Edit Spot"}
            modalComponent={EditSpot}
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
            <div className="ratingline">
            <p className="avgRatinginDetails">{singleSpot.avgStarRating}</p>
            <p className="address">{singleSpot.address}, {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                <div className="spot-images">
                    {singleSpot?.SpotImages?.map(img => {
                        return <img id="spotimages" src={img.url} alt={singleSpot.name}/>

                    })}
                </div>
            </div>
        </div>
    )
}

export default SpotSingle;