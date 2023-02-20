import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk,singleSPotThunk } from "../../store/spot";
import { NavLink,Switch, Route } from "react-router-dom";
import SpotSingle from "../Spot-Single";
import './Spots.css'


function AllSpots() {
    const dispatch = useDispatch();
   
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots || []) 
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
                        <p className="review-rating">{rating.toFixed(2)}</p>
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