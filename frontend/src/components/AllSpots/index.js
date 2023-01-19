import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spot";

function AllSpots() {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector((state) => state.Spots.allSpotsObj);
    const allSpots = Object.values(allSpotsObj)

    useEffect(()=>{
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
     <div>
        <h1>daskpdjawse</h1>
     </div>
    )
}

export default AllSpots;