import React, {Component} from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'

class ContactData extends Component{
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'fastest' },
            {value: 'cheapest', displayValue: 'cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  orderHandler = (event) => {
    //prevent the default of sending the request and reloading the page.
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
     ingredients: this.props.ingredients,
     price: this.props.price,
     orderData: formData
    }
    axios.post('/orders.json', order)
     .then(response => {
       this.setState({loading: false});
     })
     .catch(error => {
       this.setState({loading: false})
     });
  }
  checkValidity(value, rules){
    let isValid = true;
    if (rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength){
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value)
    // this will not clone the object deeply, so I will only clone pointer to the contents of the nexted object
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    // hence do this to clone it one more level deep. If you needed to enter elementConfig, you'd need to clone that deeply as well.
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[inputIdentifier] = updatedFormElement
    console.log(updatedFormElement)
    this.setState({orderForm: updatedOrderForm})
  }
  render(){
    // create an array of js objects from state orderForm so we can loop through it here
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading){
      form = <Spinner />;
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}
export default ContactData;
