import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../assets/images/CarouselImage/carousel1.jpg'
import image2 from '../../assets/images/CarouselImage/carousel2.jpg'
import image3 from '../../assets/images/CarouselImage/carousel3.webp'
import image4 from '../../assets/images/CarouselImage/carousel4.webp'
import image5 from '../../assets/images/CarouselImage/carousel5.webp'
import image6 from '../../assets/images/CarouselImage/carousel6.jpg'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { Box } from "@mui/material";
const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosNewTwoToneIcon style={{ color: "blue", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosTwoToneIcon style={{ color: "blue", fontSize: "30px" }} />
    </div>
  );
};

const CarCarousel = () => {
    const data = [image1, image2, image3, image4, image5, image6]
  return (
    <div style={{ margin: "64px 0" }} className="carousel2">
      <Slider
        autoplay
        autoplaySpeed={4000}
        dots= {true}
        initialSlide={2}
        infinite
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
        customPaging={(i) => {
          return (
            <div>
              <img
                src={data[i]}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                className='pics'
              />
            </div>
          );
        }}
        dotsClass="slick-dots custom-indicator2"
      >
        {data.map((item, index) => (
          <Box key={index} height={{xs:'25vh', sm:'40vh', lg:'75vh'}}>
            <img src={item} alt="" style={{ width: "100%", height:'100%'}} />
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default CarCarousel;