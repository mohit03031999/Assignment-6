import React from 'react';

/**
 * Product Add Form.
 * Expects 'addProduct' function as a prop.
 * Uses a controlled state for 'Price' input element for adding '$'.
 * And for rest of the elements, it uses native 'forms' object from DOM.
 */
export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      price: '$',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      name, price, category, imageUrl,
    } = document.forms.productAdd;
    const priceWithoutDollar = price.value.substring(1); // Getting value without '$'

    const product = {
      name: name.value,
      price: parseFloat(priceWithoutDollar),
      category: category.value,
      imageUrl: imageUrl.value,
    };
    const { addProduct } = this.props;
    addProduct(product);

    // Resetting the Form to initial value
    name.value = '';
    category.value = 'Shirts';
    imageUrl.value = '';
    this.setState({ price: '$' });
  }

  handlePriceChange(event) {
    const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
    this.setState({ price: `$${priceWithoutDollar}` });
  }

  render() {
    const { price } = this.state;
    return (
      <form name="productAdd" onSubmit={this.handleSubmit} className="custom-form">
        <div className="form-element">
          <label htmlFor="category" className="label">
            Category
            <select name="category" className="form-element-select">
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
          </label>

        </div>

        <div className="form-element">
          <label htmlFor="price" className="label">
            Price Per Unit
            <input type="text" name="price" value={price} onChange={this.handlePriceChange} className="form-element-input" />
          </label>
        </div>

        <div className="form-element">
          <label htmlFor="name" className="label">
            Product Name
            <input type="text" name="name" required className="form-element-input" />
          </label>
        </div>

        <div className="form-element">
          <label htmlFor="imageUrl" className="label">
            Image URL
            <input type="text" name="imageUrl" className="form-element-input" />
          </label>
        </div>

        <button type="submit" className="button button-dark">Add Product</button>
      </form>
    );
  }
}
