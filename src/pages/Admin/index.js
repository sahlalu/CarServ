import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});
const Admin = props => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('interior');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
  ];

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);
  const toggleModal = () => setHideModal(!hideModal);
  const configModal = {
    hideModal,
    toggleModal
  };
  const resetForm = () => {
    setHideModal(true);
    setProductCategory('interior');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductDesc('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    );
    resetForm();
  };
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };
  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };
  return (
    <div className="admin">
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>
              <b>Add new product</b>
            </h2>
            <FormSelect
              label="Category"
              options={[{
                value: "interior",
                name: "Interior"
              }, {
                value: "exterior",
                name: "Exterior"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />
            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />
            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="10.00"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />
            <p>Description</p>
            <ReactQuill
              value={productDesc}
              onChange={(value) => setProductDesc(value)}
              modules={modules}
              formats={formats}
            />

            <br />

            <Button type="submit">
              Add product
            </Button>
          </form>
        </div>
      </Modal>
      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
              <th>
                <div className="callToActions">
                  <ul>
                    <li>
                      <Button onClick={() => toggleModal()}>
                        Add new product
                      </Button>
                    </li>
                  </ul>
                </div>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img className="imgs" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            Rs.{productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  );
}
export default Admin;