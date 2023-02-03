import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spot";
import './Spots.css'


function AllSpots() {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots)
    // console.log(allSpotsArr)

    useEffect(()=>{
        dispatch(getAllSpotsThunk())
    }, [dispatch])

 
    return (
     <div className="MainDiv">
        {allSpotsArr.map(({id, name, previewImage, city, state, price, avgRating }) => {
            let rating = parseFloat(avgRating)
            if (isNaN(rating)){
                rating = 0
            }
            return (
                <div key={id} className="spotId">
                    <img src={previewImage} alt={name} className='images' />
                    <div className="spotInfo">
                        <p> {city}, {state}</p>
                        <p>{rating.toFixed(2)}</p>
                        <p> ${price} night</p>
                    </div>
                </div>
            )
        })}
      
        
     </div>
    )
}

export default AllSpots;