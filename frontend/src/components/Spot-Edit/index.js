
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSpotThunk } from "../../store/spot";

function EditSpot () {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const spot = useSelector((state) => state.Spots.singleSpot)
    const userSession = useSelector((state) => state.session.user)
    console.log( "SPOT LOG",spot)
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
             <form className="CreateSpotForm">
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
         
          <button className="Create-Spot-button" type="submit">Create New Spot</button>
  
        </form>
        </div>
    )
}    

export default EditSpot