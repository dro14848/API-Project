import { useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleSpotThunk } from "../../store/spot";
// import './Spots.css'

function SpotSingle() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const singleSpot = useSelector((state) => state.Spots.singleSpot.spot)
    const user = useSelector((state) => state.session.user)
    // const singleSpotArr = Object.values(singleSpot)
    // console.log(singleSpotArr)

      useEffect(() => {
        dispatch(singleSpotThunk(spotId))
        console.log(spotId)
    },[dispatch, spotId])

    if(!singleSpot || !singleSpot.name) return <h1> Spot does not Exists</h1>

    return (
        <div>
            <h2>Spot page</h2>
            <p>{singleSpot.name} </p>
        </div>
    )
}

export default SpotSingle;