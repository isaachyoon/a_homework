import React from "react";
import ReactDOM from "react-dom";
import CreditCardForm from './credit-card-form/credit-card-form.js';
import styles from './credit-card-form/credit-card-form.css'


const Index = () => {
  return <CreditCardForm/>;
};

ReactDOM.render(<Index />, document.getElementById("app"));