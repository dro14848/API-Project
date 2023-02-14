import { useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleSpotThunk } from "../../store/spot";
// import './Spots.css'

function SpotSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const singleSpot = useSelector((state) => state.Spots.singleSpot)
    // const user = useSelector((state) => state.session.user)
    // console.log('SPOT IMg',singleSpot)


      useEffect(() => {
        dispatch(singleSpotThunk(id))
    },[dispatch, id])

    if(!singleSpot) return <h1> Spot does not Exists</h1>

    return (
        
        <div className="spotdetails">
            <h1 className="name">{singleSpot.name}</h1>
            <button className="delete-button" 
            
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