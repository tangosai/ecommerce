import React from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineShopping,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  return (
    <>
      <div>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <img src={urlFor(image && image[0])} />
            </div>
          </div>
          <div className="product-details-dec">
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>{20}</p>
            </div>

            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus">
                  <AiOutlineMinus />
                </span>
                <span className="num">0</span>
                <span className="plus">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
      slug {
          current
      }
  }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
export default ProductDetails;
