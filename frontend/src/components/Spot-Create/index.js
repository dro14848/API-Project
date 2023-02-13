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
    const [previewimg, setPreviewImg] = useState('')
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
          lat,
          lng,
          name,
          description,
          price,
          previewimg
        }
      return dispatch(createSpotThunk(newSpot), previewimg).then(()=> closeModal)
 
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
            <input className="glovalInput"
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
            <input className="gloabalInput"
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
          <button className="Create-Spot-button" type="submit">Create New Spot</button>
  
        </form>
      </>
    );
  }

export default CreateSpot;