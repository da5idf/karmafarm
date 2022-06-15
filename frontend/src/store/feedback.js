import { csrfFetch } from "./csrf"

const NEW_FEEDBACK = "feedback/NEW"

export const createFeedback = (feedback) => async (dispatch) => {
    const res = await csrfFetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback })
    })

    const newFeedback = await res.json();
    console.log(newFeedback);
}