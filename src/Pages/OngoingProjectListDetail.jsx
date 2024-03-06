
import { Carousel } from 'react-carousel-minimal';
import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import { FaLocationDot } from "react-icons/fa6";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import about_bg from '../assets/images/about-bg.jpg';
import { useParams } from 'react-router-dom';
import Carousel_Diversity from '../Components/Carousel';
import API_Call from '../Components/API_Call';
import { useMediaQuery } from 'react-responsive';

export default function OngoingProjectListDetail() {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { id } = useParams();
    const { fetchData, loader } = API_Call();
    const [projectData, setProjectData] = useState();
    const [verticalImagesData, setverticalImagesData] = useState([]);
    const [horizontalImageData, setHorizontalImageData] = useState([]);
    let verticalImages = [];
    let horiontalImages = [];
    const getData = async () => {
        const data = await fetchData(`ongoingproject/${id}`, "POST");
        console.log(data);
        return data;
    }

    useEffect(() => {
        getData().then((data) => {
            setProjectData(data)

        });
    }, []);

    useEffect(() => {
        if (projectData) {
            projectData[0]?.verticle_image.forEach((element) => {
                verticalImages.push({
                    image: element.url
                })
            })
            projectData[0]?.horizontal_image.forEach((element) => {
                horiontalImages.push({
                    image: element.url
                })
            })
        }


        setverticalImagesData(verticalImages);
        setHorizontalImageData(horiontalImages);

    }, [projectData])


    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    useEffect(() => {
        handleUpArrowClick();
    }, [])
    const [currentIndex, setCurrentIndex] = useState(0);



    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    const handleSlideChange = (index) => {
        setCurrentIndex(index);
    };



    return (
        <>
            {projectData ? (<>     <div className="md:flex justify-center items-center w-full relative lg:bottom-36 md:bottom-1 bottom-0 sm:bottom-5  mb-2 md:mb-0  bg-cover bg-rigth py-3" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${about_bg})`, backgroundRepeat: "no-repeat" }}>
                <div className="md:w-3/4 sm:w-full px-6 md:px-0">
                    <h6 className='mb-1 text-amber-600 text-[#C1AE69]'>Home &gt; Ongoing Project &gt; {projectData[0].project_name}</h6>
                    <div className='flex items-center m-0'>
                        <h3 className='font-audiowide lg:text-2xl  uppercase mr-4'> {projectData[0].project_name}</h3>
                        <p className='font-light flex items-center gap-3  leading-loose tracking-wider' style={{ marginBottom: "0px !important" }}><FaLocationDot /> {projectData[0].area}</p>
                    </div>
                    <p className='font-light leading-loose tracking-wider'>
                        {projectData[0].location}                  </p>

                    <style>{
                        ` .carousel-image{
    width: 450px !important;
    height: 638px !important;
    object-fit: cover;
    border-radius: 0px !important;
  }`
                    }
                    </style>


                    <div style={{ textAlign: "center", marginBottom: "0px" }}>
                        {verticalImagesData.length > 0 ? (
                            <div style={{
                                padding: "0 20px"
                            }}>
                                <Carousel
                                    data={verticalImagesData}
                                    time={2000}
                                    width="850px"
                                    height="500px"
                                    captionStyle={captionStyle}
                                    radius="10px"
                                    slideNumber={false}
                                    slideNumberStyle={slideNumberStyle}
                                    captionPosition="bottom"
                                    automatic={false}
                                    dots={true}
                                    pauseIconColor="white"
                                    pauseIconSize="40px"
                                    slideBackgroundColor="darkgrey"
                                    slideImageFit="cover"
                                    thumbnails={true}
                                    showNavBtn={true}
                                    thumbnailWidth="100px" touchMoveDefaultEvents={true}
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "850px",
                                        maxHeight: "500px",
                                        margin: "40px auto",
                                        borderRadius: "0px"
                                    }}
                                />
                            </div>

                        ) : (
                            <div className="flex h-[50vh]  justify-center items-center m-auto pt-[40px]">
                                <img src="loader.gif" alt="" className='w-[500px] md:pt-44 md:my-44' />

                            </div>)}

                    </div>

                </div>
            </div>


                <div className="md:flex md:mt-32 justify-center items-center w-full  py-3" >
                    <div className="md:w-3/4 sm:w-full px-6 md:px-0  md:mt-44">
                        {horizontalImageData.length > 0 && (
                            <AliceCarousel
                                autoPlay
                                infinite
                                activeIndex={0}
                                autoPlayInterval={7000}
                                buttonsDisabled
                                dotsDisabled
                                mouseTracking
                                slideToIndex={currentIndex}
                                disableButtonsControls
                                onSlideChanged={handleSlideChange}
                            >
                                {[...Array(Math.ceil(horizontalImageData.length / (isMobile ? 4 : 6)))].map((_, index) => (
                                    <div key={index} className='flex flex-wrap justify-center items-center gap-y-3 md:ml-8'>
                                        {horizontalImageData.slice(index * (isMobile ? 4 : 6), (index + 1) * (isMobile ? 4 : 6)).map((data, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={data.image}
                                                alt={`Image ${index * (isMobile ? 4 : 6) + imgIndex + 1}`}
                                                className={`w-[${isMobile ? '40%' : '30%'}] md:w-[30%] h-[89px]  md:h-[186px] object-cover mr-4`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </AliceCarousel>
                        )}

                        <Carousel_Diversity category={projectData[0].category} page="ongoingProject" />
                    </div>


                </div>
            </>) : (<div className="flex lg:h-[613px] justify-center items-center m-auto pt-2">
                <img src="loader.gif" alt="" className='w-[300px] bg-blend-multiply my-44' />

            </div>)}
        </>
    );
}



