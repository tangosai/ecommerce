import React from "react";

import { client } from "../lib/client";

import {
  Footer,
  FooterBanner,
  HeroBanner,
  Layout,
  Navbar,
  Products,
  Cart,
} from "../components";

const index = ({ product, bannerData }) => {
  return (
    <>
      {/* <Navbar /> */}
      <HeroBanner herobanner={bannerData.length && bannerData[0]} />
      {/* <Products />
      <Layout />
      <Cart />
      <Footer /> */}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {product?.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerbanner={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const product = await client.fetch(query);

  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);

  return {
    props: { product, bannerData },
  };
};

export default index;
