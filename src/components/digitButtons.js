import { ACTIONS } from "../App";

export default function DigitButton({dispatch, digit, cssPart, keyboard}){
    return (
        <button onKeyUp={keyboard} className={cssPart} onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
    )
}