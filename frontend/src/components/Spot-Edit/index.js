import { useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function EditSpot () {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState([]);
    
    return (
        <div>
            <form>

            </form>
        </div>
    )
}

export default EditSpot