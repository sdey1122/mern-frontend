import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "./ProductsList";
import { startGetProducts } from "../../actions/productsAction";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PromotionalText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #ff5722;
  text-transform: uppercase;
  margin-bottom: 20px;
  animation: popIn 3s ease-in-out infinite;

  @keyframes popIn {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
`;

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetProducts());
  }, [dispatch]); // Added dispatch to the dependency array

  const productsData = useSelector((state) => state.products.data);

  return (
    <Container>
      <Row>
        <div className="col-12 pt-5">
          <PromotionalText>
            DISCOVER A WORLD OF CHOICES: EXPLORE OUR COLLECTION OF{" "}
            {productsData.length} EXCLUSIVE ITEMS!
          </PromotionalText>
          <ProductsList />
        </div>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Products;
