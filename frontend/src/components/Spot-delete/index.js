import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spot";

function DeleteSpot() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const spot = useSelector((state) => state.Spots.singleSpot)
    const userSession = useSelector((state) => state.session.user)

    const [yes, setYes] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        return dispatch(deleteSpotThunk(spot.id))
        .then(() => history.push('/'))
        .then(closeModal)
        .catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );
      
    }

    return (
        <>
        { userSession ?
        userSession.id !== spot.ownerId ? <div className="Owner-Error"> Only Spot Owners can delete a spot</div>
        :
        <>
        <div>
            <h1> Are you sure you want to Delete this Spot?</h1>
        </div>
        <div className="delete-spot-form">
            <form className="deleteform" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                         <li key={idx}>{error}</li>
                                         ))}
                  </ul>
            <div className="radio">
                        <label>
                            No
                            <input 
                                type="radio"
                                checked={yes ? false : true}
                                onChange={(e) => setYes(false)}
                                require
                            />
                        </label>
                        <label>
                            Yes
                            <input 
                            type="radio"
                            checked={yes}
                            onChange={(e) => setYes(true)}
                            require
                            />
                        </label>
            </div>
            <button className="confirm" type="submit" disabled={!yes}>
                        Confirm Deletion
            </button>
            </form>
        </div>
        </>
        : <div> Please Log in to Delete your spot</div>
        }
        </>
    )
}

export default DeleteSpot