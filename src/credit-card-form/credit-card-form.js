import React from 'react';
import {render} from 'react-dom';

class CreditCardFrom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ccInfo: {
        name: '',
        cardNumber: '',
        cvv: '',
        expMonth: '',
        expYear: '',
      },
      cardType: '',
      validation: {
        name: true,
        cardNumber: true,
        cvv: true,
        expMonth: true,
        expYear: true,
      }
    }
  }
  updateName(e) {
    let newState = Object.assign(this.state.ccInfo, {
      name: e.target.value
    })
    this.setState({ccInfo: newState});
    if (e.target.value === '') {
      this.state.validation.name = false;
    } else {
      this.state.validation.name = true;
    }
  }

  updateCardNumber(e) {
    let newState = Object.assign(this.state.ccInfo, {
      cardNumber: e.target.value
    })
    this.setState({ccInfo: newState});
    if (e.target.value === '') {
      this.state.validation.cardNumber = false;
    } else {
      this.state.validation.cardNumber = true;
    }
    this.validateCreditCard();
  }

  updateCvv(e) {
    let newState = Object.assign(this.state.ccInfo, {
      cvv: e.target.value
    })
    this.setState({ccInfo: newState});
    if (e.target.value === '') {
      this.state.validation.cvv = false;
    } else {
      this.state.validation.cvv = true;
    }
    this.validateCreditCard();
  }

  updateMonth(e) {
    if (e.target.value > 2) return;
    let newState = Object.assign(this.state.ccInfo, {
      expMonth: e.target.value
    })
    this.setState({ccInfo: newState});
    if (e.target.value === '') {
      this.state.validation.expMonth = false;
    } else {
      this.state.validation.expMonth = true;
    }
  }

  updateYear(e) {
    let newState = Object.assign(this.state.ccInfo, {
      expYear: e.target.value
    })
    this.setState({ccInfo: newState});
    if (e.target.value === '') {
      this.state.validation.expYear = false;
    } else {
      this.state.validation.expYear = true;
    }
  }

  validateCreditCard() {
    let cardNumber = this.state.ccInfo.cardNumber;
    let cvv = this.state.ccInfo.cvv;
    let cardType;
    if (cardNumber.length === 16 && cardNumber[0] === '4' && cvv.length === 3) {
      cardType = 'visa';
    } else if (cardNumber.length === 15 && (cardNumber[0] === '3' && (cardNumber[1] === '4' || cardNumber[1] ==='7'))) {
      cardType = 'amex'
    } else {
      cardType = null;
    }
    this.setState({cardType});
  }

  validateInputField() {
    let ccInfo = this.state.ccInfo;
    let valid = true;
    for (let field in ccInfo) {
      if(!ccInfo[field].length) {
        this.state.validation[field] = false;
        if(valid) {
          valid = false;
        }
      }
    }
    return valid;
  }

  submitForm(e) {
    e.preventDefault();
    this.validateCreditCard();
    if (this.validateInputField()) {
     if(confirm('Payment Success')){
        window.location.reload();
      }
    }
  }



  render() {
    return (
      <div className='container'>
        <form className='cc-form' onSubmit={this.submitForm.bind(this)}>
          <h1>Enter your credit card information</h1>
          <div className={`input-container ${this.state.validation.name}`}>
            <input type="text" placeholder="Name" onChange={this.updateName.bind(this)}></input>
            <label className="error-message">Please enter your name</label>
          </div>
          <div className={`input-container ${this.state.validation.cardNumber}`}>
            <input type="number" placeholder="Card Number" onChange={this.updateCardNumber.bind(this)}></input>
            <label className="error-message">Please enter your card number</label>
          </div>
          <div className={`input-container ${this.state.validation.cvv}`}>
            <input type="text" maxLength="4" placeholder="CVV2" onChange={this.updateCvv.bind(this)}></input>
            <label className="error-message">Please enter your cvv</label>
          </div>
          <div className='expDate'>
            <div className={`input-container ${this.state.validation.expMonth}`}>
              <input className={`input-field ${this.state.validation.expMonth}`} type="number" maxLength="2" placeholder="Exp. Month" onChange={this.updateMonth.bind(this)}></input>
              <label className="error-message">Please enter month</label>
            </div>
            <div className={`input-container ${this.state.validation.expYear}`}>
              <input className={`input-field ${this.state.validation.expYear}`} type="number" maxLength="4" placeholder="Exp. Year" onChange={this.updateYear.bind(this)}></input>
              <label className="error-message">Please enter year</label>
            </div>
          </div>
          <div className="cards">
            <img className={`type ${this.state.cardType === 'visa'}`} src="../src/credit-card-form/images/visa.png"/>
            <img className={`type ${this.state.cardType === 'master'}`} src="../src/credit-card-form/images/master_card.png"/>
            <img className={`type ${this.state.cardType === 'amex'}`} src="../src/credit-card-form/images/amex.png"/>
            <img className={`type ${this.state.cardType === 'discover'}`} src="../src/credit-card-form/images/discover.png"/>
          </div>
          <div className="submitButton" onClick={this.submitForm.bind(this)} > Submit </div>
        </form>
      </div>
    )
  }
}

export default CreditCardFrom;