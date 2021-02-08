// feature one (1) tokko
import React from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from "./store";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  createOrder = order => {
    alert("need to create order "+order.name);
  }


  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(item => item._id !== product._id)});
    localStorage.setItem("cartItems",JSON.stringify(
      cartItems.filter(item => item._id !== product._id)
    ))
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item._id == product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
  }

  render(){
    return (
      <Provider store={store} >
      <div className="grid-container">
        <header>
          <a href="/">react shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          all right is reserved.
        </footer>
      </div>
      </Provider>
    );
  }
  
}

export default App;
