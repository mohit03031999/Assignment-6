import React from 'react';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      isLoading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;

    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id name category price imageUrl
      }
    }`;

    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { id, changes });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id name category price imageUrl
      }
    }`;

    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id: parseInt(id, 10) });
    if (data) {
      const { product } = data;
      product.name = product.name != null ? product.name : '';
      product.category = product.category != null ? product.category : '';
      product.price = product.price != null ? product.price : '';
      product.imageUrl = product.imageUrl != null ? product.imageUrl : '';
      this.setState({ product, isLoading: false });
    } else {
      this.setState({ product: {}, isLoading: false });
    }
  }

  render() {
    const { product: { id }, isLoading } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (isLoading) {
        return <h3>Loading Product details...</h3>;
      }

      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }

      return null;
    }

    const {
      product: {
        name, category, price, imageUrl,
      },
    } = this.state;

    return (
      <Panel className="panel-dark">
        <Panel.Heading bsClass="dark">
          <Panel.Title>{`Editing Product: ${id}`}</Panel.Title>
        </Panel.Heading>

        <Panel.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={9}>
                <TextInput
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  key={id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="category"
                  value={category}
                  onChange={this.onChange}
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Price</Col>
              <Col sm={9}>
                <NumInput
                  name="price"
                  value={price}
                  onChange={this.onChange}
                  key={id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Image Url</Col>
              <Col sm={9}>
                <TextInput
                  name="imageUrl"
                  value={imageUrl}
                  onChange={this.onChange}
                  key={id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={6}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">Submit</Button>
                  <LinkContainer to="/products">
                    <Button bsStyle="link">Back</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}
