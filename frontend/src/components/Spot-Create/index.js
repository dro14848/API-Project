import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createSpotThunk} from '../../store/spot'
import { useModal } from "../../context/Modal";


function CreateSpot() {
    const dispatch = useDispatch();
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
    const { closeModal } = useModal();
  
    const handleSubmit = (e) => {
      e.preventDefault();
 
    };
  
    return (
      <>
      <button>Create a Spot</button>
        <form onSubmit={handleSubmit}>
  
        </form>
      </>
    );
  }

export default CreateSpot;