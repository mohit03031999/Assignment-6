import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const NO_DATA_AVAILABLE = 'No Data Available';

/**
 * Renders a single Row in the Product table
 * @param props Expects props as a 'product' object which contains
 * name, price, category and imageUrl.
 */
function ProductTableRow({ product, deleteProduct, index }) {
  const {
    name, price, category, imageUrl, id,
  } = product;

  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
  );

  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }

  return (
    <tr>
      <td>{name || NO_DATA_AVAILABLE}</td>
      <td>{price ? `$${price}` : NO_DATA_AVAILABLE}</td>
      <td>{category}</td>
      <td>{imageUrl ? (<Link to={`/img/${id}`}>View</Link>) : NO_DATA_AVAILABLE}</td>
      <td>
        <LinkContainer to={`/edit/${id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>

        {' | '}

        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

/**
* Renders the Product Table
* @param props Expects 'headings' and 'products' array as props
*/
export default function ProductTable({
  headings, products, loading, deleteProduct,
}) {
  const productTableRows = products.map(
    (product, index) => (
      <ProductTableRow
        key={product.id}
        product={product}
        deleteProduct={deleteProduct}
        index={index}
      />
    ),
  );
  const initialTableMessage = loading ? 'Loading products...' : 'No Products added yet';

  return (
    <Table bordered condensed hover responsive className="table-dark">
      <thead className="text-left bordered-table">
        <tr>
          {headings.map((heading, index) =>
            // using index as keys as Table Headings will not change dynamically
            // eslint-disable-next-line implicit-arrow-linebreak, react/no-array-index-key
            <th key={index}>{heading}</th>)}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? productTableRows : (
          <tr className="text-center"><td colSpan="5">{initialTableMessage}</td></tr>
        )}
      </tbody>
    </Table>
  );
}
