
import React,{ useReducer } from "react";
import DigitButton from "./components/digitButtons";
import OperationButton from "./components/OperationButton";
import { BsBackspace } from "react-icons/bs";

import "./stylesheet/style.css";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}){
  // eslint-disable-next-line default-case
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentState: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit == "0" && state.currentState == "0") {return state}
      // if (payload.digit === "." && state.currentState.includes(".")) {return state}

      if (payload.digit == "."){
        if (state.currentState == null){
          return {
            ...state,
            currentState: "0."
          }
          
        }
        else if(state.currentState.includes(".")){
          return state
        }
      }
      
      return {
        ...state,
        currentState: `${state.currentState || ""}${payload.digit}`
      }

    
    
      case ACTIONS.CHOOSE_OPERATION:
      if (state.currentState == null && state.previousState == null)
      {return state}
      if (state.previousState == null) 
      return{
        ...state,
        operation: payload.operation,
        previousState: state.currentState,
        currentState: null
      }
      if(state.currentState == null) 
      return{
        ...state,
        operation: payload.operation

      }

      return {
        ...state,
        previousState: evaluate(state),
        operation: payload.operation,
        currentState: null
      }

    
    
      case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentState == null || state.previousState == null)
      {return state}

      return {
        ...state,
        overwrite: true,
        currentState: evaluate(state),
        previousState: null,
        operation: null
      }
      

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {...state,
        currentState: null,
        overwrite: false}
      }
      if(state.currentState == null && state.previousState == null) {
        return {state}
      }

      if(state.previousState != null && state.currentState == null) {
        return {
          ...state,
          currentState: state.previousState,
          previousState: null,
          operation: null
        }
      }

      if(state.currentState.length === 1) {
        return {
          ...state,
          currentState: null
        }
      }

      return {
        ...state,
        currentState: state.currentState.slice(0, -1)
        
      }
    
      case ACTIONS.CLEAR:
      return {}

      

  }
}

function evaluate({previousState, currentState, operation}) {
  const previous = parseFloat(previousState)
  const current = parseFloat(currentState) 
  if (isNaN(previous) || isNaN(current)) {return ""}
  let computation = ""

  // eslint-disable-next-line default-case
  switch (operation) {
    case "÷":
      computation = previous / current;
      break;

    case "*":
      computation = previous * current;
      break;

    case "-":
      computation = previous - current;
      break;

    case "+":
      computation = previous + current;
      break;
  }

  return computation.toString()


  
}

function App() {
  const [{ currentState, previousState, operation}, dispatch] = useReducer(reducer, {});

  
  return (
    <div className="container">
      <div className="calculator-layout">

        <div className="output-box">
          <div className="previous-state">
            {previousState}
            {operation}
          </div>
          <div className="current-state">{currentState}</div>
        </div>

        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="span-two right-btn-border bottom-btn-border clear-btn"
        >
          AC
        </button>

        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          className="right-btn-border"
        >
          <BsBackspace />
        </button>

        <OperationButton
          operation="÷"
          dispatch={dispatch}
          cssPart={"operators"}
        />

        <DigitButton
          digit="1"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="2"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="3"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <OperationButton
          operation="*"
          dispatch={dispatch}
          cssPart={"operators"}
        />

        <DigitButton
          digit="4"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="5"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="6"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <OperationButton
          operation="+"
          dispatch={dispatch}
          cssPart={"operators"}
        />

        <DigitButton
          digit="7"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="8"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <DigitButton
          digit="9"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <OperationButton
          operation="-"
          dispatch={dispatch}
          cssPart={"operators"}
        />

        <DigitButton
          digit="."
          dispatch={dispatch}
          cssPart={"period-button right-btn-border"}
        />

        <DigitButton
          digit="0"
          dispatch={dispatch}
          cssPart={"right-btn-border"}
        />

        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="span-two equality-button operators top-btn-border"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
