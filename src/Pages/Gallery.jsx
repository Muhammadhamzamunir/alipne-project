import { useSwipeable } from "react-swipeable";

import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import Button from '../Components/Button';
import API_Call from "../Components/API_Call";

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [currentPhototype, setCurrentPhototype] = useState();
    const [verticle_image_Index, setverticle_image_Index] = useState(9);
    const [horizontal_image_Index, sethorizontal_image_Index] = useState(6);
    const [uniqueCategories, setUniqueCategories] = useState();

    const [filtered_verticle_images, setFiltered_verticle_images] = useState([]);
    const [filtered_horizontal_images, setFiltered_horizontal_images] = useState([]);
    const [verticle_images, setVerticle_images] = useState([]);
    const [horizontal_images, setHorizontal_images] = useState([]);
    const [contentList, setContentList] = useState([]);
    const [scrollPercent, setScrollPercent] = useState(0);
    const { fetchData } = API_Call();
    const categories = ["All"];

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    useEffect(() => {
        filterPhotosByCategory();
        setContentList([]);
        setverticle_image_Index(9);
        sethorizontal_image_Index(6)
    }, [activeCategory, uniqueCategories]);


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = (scrollTop / scrollHeight) * 100;
            setScrollPercent(percent);
        };

        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (scrollPercent >= 70 && filtered_verticle_images.length >= verticle_image_Index) {
            setverticle_image_Index(prevCount => prevCount + 8);
            sethorizontal_image_Index(prevCount => prevCount + 5)
            let newLoadedImages = imagesContainer(filtered_verticle_images, filtered_horizontal_images, verticle_image_Index, horizontal_image_Index)
            setContentList((prevContentList) => [...prevContentList, newLoadedImages]);
        }
    }, [scrollPercent])


    const fetchDataFromAPI = async () => {
        let verticle = [];
        let horizontal = [];
        try {
            const data = await fetchData("gallery");

            if (data) {
                data.sort((a, b) => b.id - a.id).map((item) => {
                    const existedCategory = categories.find(category => category === item.category);
                    if (!existedCategory) {
                        categories.push(item.category);
                    }
                    //vertical images
                    item.verticle_image.map((image) => {

                        verticle.push({ "category": item.category, "vertical_image": image.url, "Project_id": item.id, "id": image.id })
                    })
                    //Horizontal images
                    item.horizontal_image.map((image) => {

                        horizontal.push({ "category": item.category, "horizontal_image": image.url, "Project_id": item.id, "id": image.id })
                    })

                });

            }
            setUniqueCategories(categories);
            setVerticle_images(verticle);
            setHorizontal_images(horizontal);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    const filterPhotosByCategory = () => {

        if (activeCategory === "All") {

            setFiltered_verticle_images(verticle_images);
            setFiltered_horizontal_images(horizontal_images);
        } else {


            const vertical_filtered = verticle_images.filter(item => item.category === activeCategory);
            const horizontal_filtered = horizontal_images.filter(item => item.category === activeCategory);
            setFiltered_verticle_images(vertical_filtered);
            setFiltered_horizontal_images(horizontal_filtered);
        }
    };







    const openModal = (index, type) => {
        console.log(index, type);
        console.log(filtered_horizontal_images);
        setCurrentPhotoIndex(index);
        setCurrentPhototype(type)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextPhoto = () => {
        if (currentPhototype == "verticle") {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % filtered_verticle_images.length);

        } else {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % filtered_horizontal_images.length);

        }
    };

    const prevPhoto = () => {
        if (currentPhototype == "verticle") {
            setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + filtered_verticle_images.length) % filtered_verticle_images.length);
        }
        else {
            setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + filtered_horizontal_images.length) % filtered_horizontal_images.length);

        }
    };
    const handlers = useSwipeable({
        onSwipedLeft: () => nextPhoto(),
        onSwipedRight: () => prevPhoto(),
    });
    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        handleUpArrowClick();
    }, []);

    return (
        <>
            <div className='relative lg:bottom-24 md:bottom-1 bottom-0 sm:bottom-5'>
                <div className="md:flex justify-center items-center w-full mb-4  ">
                    <div className="md:w-3/4 sm:w-full px-6 md:px-0">
                        <h1 data-aos="fade-down" className='font-audiowide text-3xl pb-6 uppercase'>Gallery</h1>
                        <p data-aos="fade-down" className='font-light leading-loose tracking-wider'>
                            Dive into our rich portfolio unveiling the artistry of architectural and interior design. Each image narrates a distinctive tale of our transformative touch, spanning modern residences to groundbreaking commercial spaces. Immerse yourself in inspiration as you envision your project materializing. Explore our gallery, where creativity, functionality, and aesthetic allure converge in every captivating design and exquisite detail, defining the hallmark of our projects.
                        </p>
                    </div>
                </div>

                <div className="flex  overflow-x-auto  no-scrollbar md:ml-[14%] mb-8 ml-5" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                    {uniqueCategories?.map((category, index) => (
                        <div key={index} style={{ fontSize: "22px" }} className={`cursor-pointer mr-8 pb-2 font-light  ${activeCategory === category ? " border-b-2 border-white-500" : ""}`} onClick={() => setActiveCategory(category)}>
                            {category}
                        </div>
                    ))}
                </div>

                {
                    imagesContainer(filtered_verticle_images, filtered_horizontal_images, 0, 0)
                }
                {contentList.map((content, index) => (
                    <div key={index}>{content}</div>

                ))}
            </div>

            <Modal show={isModalOpen} onClose={closeModal} size="4xl" className="backdrop-blur-lg min-h-[100vh] z-50 padding-0" {...handlers}>
                <Modal.Body>
                    <div className="relative padding-0">
                        <span className='absolute top-0 right-0 z-50 p-2 '><Button text={"✕"} onClick={closeModal} /></span>
                        <div className="lg:pt-0 pt-36 flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center  w-full mt-8 top-22">
                                <span className='absolute left-3 md:left-6 z-40 hidden lg:block '><Button text={"←"} onClick={prevPhoto} /></span>
                                {
                                    (currentPhototype == "horizontal") ? (

                                        <img src={filtered_horizontal_images[currentPhotoIndex]?.horizontal_image} alt="Modal" className="max-w-full w-[100%] lg:w-[85%]  md:h-[85vh] h-[270px]  object-fill" />
                                    ) :
                                        (
                                            <img src={filtered_verticle_images[currentPhotoIndex]?.vertical_image} alt="Modal" className="max-w-full w-[100%] lg:w-[35%]  md:h-[90vh] h-[270px]  object-fill" />
                                        )
                                }

                                <span className=' absolute right-3 md:right-6 z-40 hidden lg:block'><Button text={"→"} onClick={nextPhoto} /></span>
                            </div>
                            {(currentPhototype == "horizontal") ?
                                (<div className="text-center">
                                    {currentPhotoIndex + 1} / {filtered_horizontal_images.length}
                                </div>)
                                :
                                (<div className="text-center">

                                    {currentPhotoIndex + 1} / {filtered_verticle_images.length}
                                </div>)
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );



    function imagesContainer(filtered_verticle_images, filtered_horizontal_images, verticle_image_index, horizontal_image_index) {
        return (

            filtered_verticle_images.length > 0 || filtered_horizontal_images.length > 0 ? (<div className="md:flex justify-center items-center w-full relative mt-3  ">
                <div className="md:w-3/4 sm:w-full px-6 md:px-0" >


                    <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                        {filtered_horizontal_images[horizontal_image_index] && <div className='w-1/2 lg:w-1/2 '>
                            <img src={filtered_horizontal_images[horizontal_image_index].horizontal_image} alt="" className='md:h-[282px] h-[87px] object-cover w-full cursor-pointer ' onClick={() => openModal(horizontal_image_index, "horizontal")} />

                        </div>}
                        {filtered_horizontal_images[horizontal_image_index + 1] && <div className='w-1/2 lg:w-1/2 '>
                            <img src={filtered_horizontal_images[horizontal_image_index + 1]?.horizontal_image} alt="" className='  md:h-[282px] h-[87px] object-cover w-full cursor-pointer ' onClick={() => openModal(horizontal_image_index + 1, "horizontal")} />

                        </div>}
                    </div>

                    <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                        {filtered_horizontal_images[horizontal_image_index + 2] && <div className='w-1/2 lg:w-1/2 ' onClick={() => openModal(horizontal_image_index + 2, "horizontal")}>
                            <img src={filtered_horizontal_images[horizontal_image_index + 2]?.horizontal_image} alt="" className='md:h-[282px]  h-[87px] w-full cursor-pointer' />

                        </div>}
                        {filtered_horizontal_images[horizontal_image_index + 3] && <div className='w-1/2 lg:w-1/2 ' onClick={() => openModal(horizontal_image_index + 3, "horizontal")}>
                            <img src={filtered_horizontal_images[horizontal_image_index + 3]?.horizontal_image} alt="" className='  md:h-[282px] h-[87px] w-full cursor-pointer' />

                        </div>}
                    </div>

                    <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                        {filtered_verticle_images[verticle_image_index] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(verticle_image_index, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index]?.vertical_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 1] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 1, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 1]?.vertical_image} alt="" className='cursor-pointer h-[178px] md:h-[556px] md:w-[325px] ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 2] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 2, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 2]?.vertical_image} alt="" className='  md:h-[556px]  h-[178px] md:w-[325px] cursor-pointer' />

                        </div>}
                    </div>

                    <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                        {filtered_horizontal_images[horizontal_image_index + 4] && <div className='w-1/2 lg:w-1/2 cursor-pointer'>
                            <img src={filtered_horizontal_images[horizontal_image_index + 4].horizontal_image} alt="" className='md:h-[282px]  h-[87px] w-full object-cover cursor-pointer ' onClick={() => openModal(horizontal_image_index + 4, "horizontal")} />

                        </div>}
                        {filtered_horizontal_images[horizontal_image_index + 5] && <div className='w-1/2 lg:w-1/2 cursor-pointer'>
                            <img src={filtered_horizontal_images[horizontal_image_index + 5]?.horizontal_image} alt="" className='  md:h-[282px] h-[87px] w-full object-cover cursor-pointer ' onClick={() => openModal(horizontal_image_index + 5, "horizontal")} />

                        </div>}
                    </div>
                    <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                        {filtered_verticle_images[verticle_image_index + 3] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(verticle_image_index + 3, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 3]?.vertical_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 4] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 4, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 4]?.vertical_image} alt="" className='cursor-pointer h-[178px]  md:h-[556px] md:w-[325px] ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 5] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 5, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 5]?.vertical_image} alt="" className=' h-[178px]  md:h-[556px] md:w-[325px] cursor-pointer' />

                        </div>}
                    </div>
                    <div className=' flex flex-row items-center justify-evenly  gap-[1%]  '>
                        {filtered_verticle_images[verticle_image_index + 6] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(verticle_image_index + 6, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 6]?.vertical_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 7] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 7, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 7]?.vertical_image} alt="" className='cursor-pointer h-[178px] md:h-[556px] md:w-[325px] ' />

                        </div>}
                        {filtered_verticle_images[verticle_image_index + 8] && <div className='w-1/3 lg:w-1/3 cursor-pointer' onClick={() => openModal(verticle_image_index + 8, "verticle")}>
                            <img src={filtered_verticle_images[verticle_image_index + 8]?.vertical_image} alt="" className='  md:h-[556px] h-[178px] md:w-[325px] cursor-pointer' />

                        </div>}
                    </div>
                </div>
            </div>) : (<div className="flex h-32 justify-center items-center pt-20">
                <img src="loader.gif" alt="" className='w-[300px]   my-44' />

            </div>)

        )
    }
}
