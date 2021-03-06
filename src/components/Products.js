import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import {fetchProducts} from '../actions/productActions';
import { connect } from 'react-redux';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount(){
        this.props.fetchProducts();
    }


    openModal = product => {
        this.setState({ product });
    }
    closeModal = () => {
        this.setState({ product: null });
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.products ? <div>Loading...</div> :
                        <ul className="products">
                        {
                            this.props.products.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a
                                            href={"#" + product._id}
                                            onClick={event => this.openModal(product)}
                                        >
                                            <img src={product.image} alt={product.title} />
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        <div className="product-price">
                                            <div className="">
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button
                                                className="button primary"
                                                onClick={e => this.props.addToCart(product)}
                                            >
                                                Add To Cart
                                        </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                
                    }
                    
                </Fade>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <div>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                            </div>
                            <Zoom>
                                <div className="product-details">
                                    <img src={product.image} />
                                    <div className="product-details-description">
                                        <p> <strong>{product.title}</strong></p>
                                        <p>{product.description}</p>
                                        <p>Available sizes {" "}
                                            {
                                                product.availableSizes.map(size => (
                                                    <span>
                                                        {" "}
                                                        <button className="button">{size}</button>
                                                    </span>
                                                ))
                                            }
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button
                                                onClick={e => {
                                                    this.props.addToCart(product);
                                                    this.closeModal();
                                                }}
                                                className="button primary">Add To Cart
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

export default connect(state => ({
    products: state.products.filteredItems
}),{
    fetchProducts: fetchProducts
})(Products);
