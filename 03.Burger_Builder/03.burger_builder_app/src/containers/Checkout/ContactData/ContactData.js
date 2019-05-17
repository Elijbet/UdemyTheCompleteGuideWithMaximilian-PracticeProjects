import React, {Component} from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component{
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    //prevent the default of sending the request and reloading the page.
    event.preventDefault();
    this.setState({loading: true});
    const order = {
     ingredients: this.props.ingredients,
     price: this.props.price,
     customer: {
       name: 'Liz Ka',
       address: {
         street: 'Test street 1',
         zipCode: '43545',
         country: 'USA'
       },
       email: 'test@test.com'
     },
     deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
     .then(response => {
       this.setState({loading: false});
       console.log('response', response)
     })
     .catch(error => {
       this.setState({loading: false})
     });
  }

  render(){
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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