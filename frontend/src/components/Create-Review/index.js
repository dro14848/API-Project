import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { createReviewThunk, getAllReviewThunk } from "../../store/review"
import { singleSpotThunk } from "../../store/spot"

function CreateReview() {
const dispatch = useDispatch();
// const { id } = useParams();
const history = useHistory()
const {closeModal} = useModal();
const userSession = useSelector((state) => state.session.user)
const spot = useSelector((state) => state.Spots.singleSpot)
const id = useSelector((state) =>state.Spots.singleSpot.id)



const [review, setReview] = useState("")
const [stars,setStars] = useState(1)
const [show, setShow] = useState(false);
const [errors, setErrors] = useState([]);


const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    const errors = [];
    console.log("errosr",errors)

    if(review.length < 3){
        errors.push('Reviews must be at least 3 characters')
    }
    if(review.length > 100){
        errors.push("Reviews must has 100 characters or less")
    }

    if(stars < 1 || stars > 5){
        errors.push("Star rating must be a number between 1 and 5")
    }

    
        if (errors.length > 0) {
            setErrors(errors)
            return
        }
    const newReview = {
        review,
        stars
    }
    // console.log(createReviewThunk(newReview))
    return  dispatch(createReviewThunk(newReview, id))
    .then(() => dispatch(getAllReviewThunk(spot.id)))
        .then(() => dispatch(singleSpotThunk(spot.id)))
        .then(closeModal)
            .catch(
        async (res) => {
          const data = await res.json();
            console.log("ERROR", data)
          if (data && data.errors) setErrors(data.errors);
        }
     )
}





    return (
        <>
        { userSession ?
        userSession.id === spot.ownerId ? <div className="Owner-Error"> You cannot create a review for your own spot...</div>
        :
        <>
        <div className="Add-Review-Main-Div">
            <form className="CreateReviewForm" onSubmit={handleSubmit}>
                <h2>Create a Review</h2>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                  ))}
                 </ul>
                <label>
                    Review
                    < input className="globalInput"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Stars
                    < input className="globalInput"
                    type="text"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                    />
                </label>
                <button className="Add-Review-Button" type="submit"> Add Review</button>

            </form>
          
        </div>

        </>
        : <div> Please Log in to Post a review</div>
        }
                    </>
    )
}

export default CreateReview