import { useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk,singleSPotThunk } from "../../store/spot";
import { NavLink,Switch, Route } from "react-router-dom";
import SpotSingle from "../Spot-Single";
import './Spots.css'


function AllSpots() {
    const dispatch = useDispatch();
    // const { spotId } = useParams();
    // const singleSpot = useSelector((state) => state.Spots.singleSpot)
    // console.log(singleSpot)
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots)
    // console.log(allSpotsArr)

    useEffect(()=>{
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(singleSPotThunk(spotId))
    // },[dispatch, spotId])

 
    return (
     <div className="MainSpotDiv">
        {allSpotsArr.map(({id, name, previewImage, city, state, price, avgRating }) => {
            let rating = parseFloat(avgRating)
            if (isNaN(rating)){
                rating = 0
            }
            return (
                <div key={id} className="spotId">
                    <NavLink to={`/spots/${id}`} className="spotNavLink">

                    <img src={previewImage} alt={name} className='images' />
                    <div className="spotInfo">
                        <p> {city}, {state}</p>
                        <p>{rating.toFixed(2)}</p>
                        <p> ${price} night</p>
                    </div>
                    </NavLink>
                </div>
            )
        })}
            <Switch>
                <Route path='/spots/:id'>
                    <SpotSingle spots={allSpotsArr} />
                </Route>
            </Switch>
      
        
     </div>
    )
}

export default AllSpots;