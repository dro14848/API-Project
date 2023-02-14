import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createSpotThunk} from '../../store/spot'
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function CreateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("")
    const [SpotImages, setPreviewImg] = useState('')
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
  
    const handleSubmit = (e) => {
      e.preventDefault();

      setErrors([]);

        const newSpot= {
          address,
          city,
          state,
          country,
          lat: 123.23,
          lng: 123.12,
          name,
          description,
          price,
          SpotImages
        }

        
        console.log("COMPONANT", newSpot)
      return dispatch(createSpotThunk(newSpot))
      .then(()=> closeModal);
 
    };
  
    return (
      <>
      <button>Create a Spot</button>
        <form className="CreateSpotForm"onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Address
            <input className="globalInput"
            type="text"
            value={address}
            onChange= {(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            City
            <input className="globalInput"
            type="text"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            />
          </label>
          <label>
            State
            <input className="globalInput"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            />
          </label>
          <label>
            Country
            <input className="globalInput"
            type="text"
            value={country}
            onChange={(e)=> setCountry(e.target.value)}
            />
          </label>
          <label>
            Name
            <input className="globalInput"
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)} 
            />
          </label>
          <label>
            Description
            <input className="globalInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Price
            <input className="globalInput"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Preview Image 
            <input className="globalInput"
            type="text"
            value={SpotImages}
            onChange={(e) => setPreviewImg(e.target.value)}
            />
          </label>
          <button className="Create-Spot-button" type="submit">Create New Spot</button>
  
        </form>
      </>
    );
  }

export default CreateSpot;