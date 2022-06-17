import { csrfFetch } from "./csrf"

const NEW_FEEDBACK = "feedback/NEW";
const GET_FEEDBACK = "feedback/GET";

export const createFeedback = (feedback) => async (dispatch) => {
    const res = await csrfFetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback })
    })

    const newFeedback = await res.json();
}

export const getFeedback = () => async (dispatch) => {
    const res = await csrfFetch("/api/feedback");

    const feedback = await res.json();
    dispatch(hydrateFeedback(feedback));
}

const hydrateFeedback = (feedback) => ({
    type: GET_FEEDBACK,
    feedback
})


const initialState = {}

const feedbackReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)

    switch (action.type) {
        case GET_FEEDBACK:
            action.feedback.forEach(record => {
                newState[record.id] = record;
            })
            return newState;
        default:
            return state
    }
}

export default feedbackReducer