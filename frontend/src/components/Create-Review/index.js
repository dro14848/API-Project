import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { createReviewThunk } from "../../store/review"

function CreateReview() {
const dispatch = useDispatch();
// const { id } = useParams();
const history = useHistory()
const {closeModal} = useModal();
const spot = useSelector((state) => state.Spots.singleSpot)
const id = useSelector((state) =>state.Spots.singleSpot.id)

// const user = useSelector((state) => state.Session.user)

const [review, setReview] = useState("")
const [stars,setStars] = useState(1)
const [errors,SetErrors] = useState([])

// console.log("SPOT", spot)
// console.log("SPOTID", id)
const handleSubmit = (e) => {
    e.preventDefault();

    SetErrors([]);

    const newReview = {
        review,
        stars
    }
    console.log(createReviewThunk(newReview))
return dispatch(createReviewThunk(newReview, id))
.then(() => {
    closeModal()
    // history.push(`/spots/${spot.Id}`)
})

}

    return (
        <div className="Add-Review-Main-Div">
            <form className="CreateReviewForm" onSubmit={handleSubmit}>
                <label>
                    Review
                    < input className="globalInput"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <label>
                    Stars
                    < input className="globalInput"
                    type="text"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    />
                </label>
                <button className="Add-Review-Button" type="submit"> Add Review</button>

            </form>
          
        </div>
    )
}

export default CreateReview