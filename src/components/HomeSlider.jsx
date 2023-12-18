import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { sliderData } from "../data";
import { Typography } from "@material-ui/core";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  left: ${(props) => props.position === "left" && "10px"};
  right: ${(props) => props.position === "right" && "10px"};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slider = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #40e0d0, #ffd700);
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
`;

const Images = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled(Typography)`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  animation: ${bounce} 2s ease-in-out infinite;
  line-height: 1.4;
`;

const Description = styled(Typography)`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  line-height: 1.4;
`;

const SimpleButton = styled.button`
  background-image: linear-gradient(45deg, #007bff, #8811c5);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    box-shadow: 0px 0px 10px #8811c5;
  }

  .glowing-txt {
    font-weight: bold;
    text-transform: uppercase;
    color: white;
  }
`;
const HomeSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const data = useSelector((state) => {
    return [state.customer.isLogin, state.supplierLogin.supplierLogin];
  });

  const [isLogin, supplierLogin] = data;

  const intervalDuration = 5000;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextSlideIndex = (slideIndex + 1) % sliderData.length;
      setSlideIndex(nextSlideIndex);
    }, intervalDuration);
    return () => clearInterval(slideInterval);
  }, [slideIndex]);

  const handleClick = (position) => {
    if (position === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderData.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderData.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow position="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Arrow position="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderData.map((data) => (
          <Slider bg={data.bg} key={data.id}>
            <ImgContainer>
              <Images src={data.img} />
            </ImgContainer>
            <InfoContainer>
              <Title variant="h2"> {data.title} </Title>
              <Description variant="body1"> {data.description} </Description>
              {!isLogin && !supplierLogin && (
                <Link to="/auth/login">
                  <SimpleButton>
                    <span className="glowing-txt">Log In to Shop Now</span>
                  </SimpleButton>
                </Link>
              )}

              {isLogin && (
                <Link to="/products">
                  <SimpleButton>
                    <span className="glowing-txt">Explore Products</span>
                  </SimpleButton>
                </Link>
              )}

              {supplierLogin && (
                <Link to="/products">
                  <SimpleButton>
                    <span className="glowing-txt">Add/Remove Products</span>
                  </SimpleButton>
                </Link>
              )}
            </InfoContainer>
          </Slider>
        ))}
      </Wrapper>
      <Arrow position="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default HomeSlider;
