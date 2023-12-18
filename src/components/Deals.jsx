import styled from "styled-components";

const Container = styled.div`
  height: 37px;
  background-image: linear-gradient(-45deg, #007bff, #8811c5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 550;
`;

const Deals = () => {
  return (
    <Container>Great Indian Sale! Free shipping for all orders!!!</Container>
  );
};

export default Deals;
