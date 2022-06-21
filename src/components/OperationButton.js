import { ACTIONS } from "../App";

export default function OperationButton({ dispatch, operation, cssPart }) {
  return (
    <button
      className={cssPart}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
