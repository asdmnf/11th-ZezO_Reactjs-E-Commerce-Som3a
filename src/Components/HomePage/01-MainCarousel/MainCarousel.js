import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "./CarouselItem/CarouselItem";
import mobile from "../../../Assets/images/mobile.png";
import { useState } from "react";
import MainCarouselHook from "../../../Hooks/MainCarouselHook";
import "./MainCarousel.css";

const MainCarousel = () => {

  const [allCarouselData, editCarouselOnClickHandle, deleteCarouselOnClickHandle] = MainCarouselHook()

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);}

  return (
    <div className="main-carousel">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {
          allCarouselData?.data?.map(item => {
            return <Carousel.Item key={item._id} interval={5000}>
            <CarouselItem
              carouselID={item._id}
              offer={item.title}
              img={item.foregroundImage}
              BGColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
              searchWord={item.searchWord}
              editCarouselOnClickHandle={editCarouselOnClickHandle}
              deleteCarouselOnClickHandle={deleteCarouselOnClickHandle}
            ></CarouselItem>
          </Carousel.Item>
          })
        }
      </Carousel>
    </div>
  );
};

export default MainCarousel;
