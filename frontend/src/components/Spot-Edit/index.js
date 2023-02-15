import { useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSpotThunk } from "../../store/spot";

function EditSpot () {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector((state) => state.Spots.singleSpot)
    // const userSession = useSelector((state) => state.session.user)

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([]);
    
    console.log("SPOTCHECK", spot)


    return (
      <div>
        EDIT SPOT TEST
      </div>  
    )
    }


export default EditSpot