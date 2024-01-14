import React, { useReducer } from 'react';
import Button from './Buttons.jsx';

const ACTIONS = {
  ADD_DIGIT: "digit",
  ADD_OPERATOR: "operator",
  CLR: "clear",
  EQUAL: "equalsTo",
  DELETE: "delete"
}

function App() {

  let initial = {
    currentValue: "",
    prevValue: "",
    operator: ""
  }


  function reducer(state, { type, payLoad }) {

    switch (type) {

      case ACTIONS.ADD_DIGIT:  // this is triggered when numbers and point is clicked.
        if (payLoad === "0" && state.currentValue === "0") {
          return {
            ...state
          }
        }
        else if (state.currentValue.includes(".") && payLoad === ".") {
          return {
            ...state
          }
        }
        else {
          return {
            ...state,
            currentValue: state.currentValue + payLoad
          }
        }

      case ACTIONS.CLR:  // this is triggered when clear button is pressed. It clears the i/p and o/p 
        return {
          currentValue: "",
          prevValue: "",
          operator: ""
        }

      case ACTIONS.ADD_OPERATOR:  // this is triggered when any operator is pressed 

        if (state.currentValue === "" && state.prevValue === "") { // this is triggered when user tries to enter the operator when there is no input 
          return { ...state }
        }
        
        if (state.prevValue === "") {  // this case is for first time user input
          return {
            state,
            prevValue: state.currentValue,
            operator: payLoad,
            currentValue: ""
          }
        }

        if (state.currentValue === "") { // this case is for changing the operator eg: if user has pressed + and then he wants to change the operator from + to - 
          return {
            ...state,
            operator: payLoad
          }
        }

        return {  // this is triggered when when you want to calculate the result with with other number i.e 2 + 2 is pressed then if again + or other operator is pressed then this function is triggered
          ...state,
          prevValue: evaluate(state),
          operator: payLoad,
          currentValue: ""
        }



      case ACTIONS.EQUAL:
        if (state.prevValue === "" || state.currentValue === "" || state.operator === "") {
          return {
            ...state
          }
        }

        return {
          ...state,
          currentValue: evaluate(state),
          operator: "",
          prevValue: ""
        }

      case ACTIONS.DELETE:
        if (state.currentValue === "") {
          return {
            ...state
          }
        }

        return {
          ...state,
          currentValue: state.currentValue.slice(0, -1)
        }

      default:
        return state;
    }
  }

  function evaluate({ currentValue, prevValue, operator }) {
    const current = parseFloat(currentValue);
    const previous = parseFloat(prevValue);

    let ans;

    switch (operator) {
      case "+":
        ans = current + previous;
        break;

      case "-":
        ans = previous - current;
        break;

      case "*":
        ans = previous * current;
        break;

      case "/":
        ans = previous / current;
        break;
    }

    console.log(ans);

    const answer = String(ans);

    return answer;
  }

  const [{ currentValue, prevValue, operator }, dispatch] = useReducer(reducer, initial);

  return (
    <div className=' w-full flex  items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-400'>


      <div className='grid grid-cols-4 grid-flow-row mt-10 bg-white bg-opacity-40 border-2 border-black'>
        <div className=' h-20 col-span-4 border-b-2 border-black bg-teal-900 text-white text-right font-serif pr-2'>
          <div className='text-lg '>{prevValue} {operator}</div>
          <div className='text-3xl '>{currentValue}</div>
        </div>

        <button className="border-2 px-6 py-5 col-span-2" onClick={() => { dispatch({ type: ACTIONS.CLR }) }}>AC</button>
        <Button val="del" dispatch={dispatch} type={ACTIONS.DELETE} />
        <Button val="/" dispatch={dispatch} type={ACTIONS.ADD_OPERATOR} />
        <Button val="1" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="2" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="3" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="*" dispatch={dispatch} type={ACTIONS.ADD_OPERATOR} />
        <Button val="4" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="5" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="6" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="+" dispatch={dispatch} type={ACTIONS.ADD_OPERATOR} />
        <Button val="7" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="8" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="9" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="-" dispatch={dispatch} type={ACTIONS.ADD_OPERATOR} />
        <Button val="." dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />
        <Button val="0" dispatch={dispatch} type={ACTIONS.ADD_DIGIT} />

        <button className="border-2 px-6 py-5 col-span-2" onClick={() => { dispatch({ type: ACTIONS.EQUAL }) }} >=</button>
      </div>
    </div>
  );
}

export default App;