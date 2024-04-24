import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import LoadMore from '../LoadMore';
import FormSelect from '../forms/FormSelect';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const ProductResults = ({ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart({ filterType })
    )
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>
          No search results.
        </p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [{
      name: 'Show All',
      value: ''
    }, {
      name: 'Interior',
      value: 'interior'
    }, {
      name: 'Exterior',
      value: 'exterior'
    },],
    handleChange: handleFilter
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    )
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className='fix'>
      <h1>
        Browse Products
      </h1>
      <FormSelect {...configFilters}></FormSelect>
      <div className="products">


        <div className="productResults">
          {data.map((product, pos) => {
            const { productThumbnail, productName, productPrice } = product;
            if (!productThumbnail || !productName ||
              typeof productPrice === 'undefined') return null;

            const configProduct = {
              ...product
            };

            return (
              <Product key={pos}{...configProduct} />
            );
          })}
        </div>
        {!isLastPage && (
          <LoadMore {...configLoadMore} ></LoadMore>
        )}
      </div>
    </div>
  );
};

export default ProductResults;