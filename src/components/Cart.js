import React, { Component } from 'react'
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email: "",
            address: "",
            showCheckout: false
        }
    }
    
    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    createOrder = event => {
        event.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order);
    }
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>
                : <div className="cart cart-header">you have { cartItems.length } in the cart {" "}</div> }
            <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <div>
                                    <img key={item.id} src={item.image} alt={item.title} />
                                </div>
                                <div>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div className="right">
                                        {formatCurrency(item.price)} * {item.count} {" "}
                                        <button
                                        className="button"
                                        onClick={ e=> this.props.removeFromCart(item)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                                </div>
                            </li>
                        ))}
                    </ul>
                    </Fade>
                </div>
                {cartItems.length !==0 && (
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                            Total : {" "}
                                {formatCurrency(cartItems.reduce((a,c)=>a = a + (c.price * c.count),0))}
                            </div>
                            <button
                            onClick={e => this.setState({showCheckout: true})}
                            className="button primary">
                                proceed
                            </button>
                        </div>
                    </div>
                    {this.state.showCheckout && (
                        <Fade right cascade>
                        <div>
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input type="email" name="email" required onChange={this.handleInput}/>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input type="name" name="name" required onChange={this.handleInput}/>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input type="text" name="address" required onChange={this.handleInput}/>
                                    </li>
                                    <li>
                                        <button type="submit" className="button primary">
                                            Checkout
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </Fade>
                        
                    )}
                    </div>

                )}
                
            </div>
            </div>
        )
    }
}
