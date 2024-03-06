import { useSwipeable } from "react-swipeable";

import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import Button from '../Components/Button';
import API_Call from "../Components/API_Call";

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [galleryData, setGalleryData] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState();
    const [filteredPhotos, setFilteredPhotos] = useState([]);

    const { fetchData } = API_Call();

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    useEffect(() => {
        filterPhotosByCategory();
    }, [activeCategory, galleryData]);

    const fetchDataFromAPI = async () => {
        try {
            const data = await fetchData("gallery");
            // const data = [
            //     {
            //         "id": 7,
            //         "category": "Residential",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Residential",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Residential",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     },
            //     {
            //         "id": 7,
            //         "category": "Urban",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "INDUSTRAL",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Ali",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Hamza",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Hero",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Hero",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }, {
            //         "id": 7,
            //         "category": "Hero",
            //         "verticle_image": [
            //             {
            //                 "id": 489,
            //                 "url": "https://architecture.flashcitytours.com/storage/489/vertical_demo_0.png"
            //             }
            //         ],
            //         "horizontal_image": [
            //             {
            //                 "id": 490,
            //                 "url": "https://architecture.flashcitytours.com/storage/490/horizontal_image_0.png"
            //             }
            //         ]
            //     }
            // ]

            const categories = ["All"];
            const allDataImages = []
            if (data) {
                data.map((item) => {
                    const existedCategory = categories.find(category => category === item.category);
                    if (!existedCategory) {
                        categories.push(item.category);
                    }

                    allDataImages.push({ "category": item.category, "vertical_image": item.verticle_image[0]?.url, "horizontal_image": item.horizontal_image[0]?.url, "id": item.id })
                });

            }
            setUniqueCategories(categories);
            setGalleryData(allDataImages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filterPhotosByCategory = () => {
        if (activeCategory === "All") {
            setFilteredPhotos(galleryData);
        } else {
            const filtered = galleryData.filter(item => item.category === activeCategory);
            console.log(filtered);
            setFilteredPhotos(filtered);
        }
    };





    const openModal = (index) => {
        setCurrentPhotoIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % filteredPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
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

                <div className="flex  overflow-x-auto  no-scrollbar md:ml-[14%] ml-5" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                    {uniqueCategories?.map((category, index) => (
                        <div key={index} style={{ fontSize: "22px" }} className={`cursor-pointer mr-8 pb-2 font-light  ${activeCategory === category ? " border-b-2 border-white-500" : ""}`} onClick={() => setActiveCategory(category)}>
                            {category}
                        </div>
                    ))}
                </div>
                {
                    filteredPhotos.length > 0 ? (<div className="md:flex justify-center items-center w-full relative mt-3  ">
                        <div className="md:w-3/4 sm:w-full px-6 md:px-0" >


                            <div className=' flex flex-row items-center justify-evenly mt-8 gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[0] && <div className='w-1/2 lg:w-1/2 '>
                                    <img src={filteredPhotos[0].vertical_image} alt="" className='md:h-[282px] h-[87px] object-cover w-full cursor-pointer ' onClick={() => openModal(0)} />

                                </div>}
                                {filteredPhotos[1] && <div className='w-1/2 lg:w-1/2 '>
                                    <img src={filteredPhotos[1]?.vertical_image} alt="" className='  md:h-[282px] h-[87px] object-cover w-full cursor-pointer ' onClick={() => openModal(1)} />

                                </div>}
                            </div>

                            <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[2] && <div className='w-1/2 lg:w-1/2 ' onClick={() => openModal(2)}>
                                    <img src={filteredPhotos[2]?.vertical_image} alt="" className='md:h-[282px]  h-[87px] w-full cursor-pointer' />

                                </div>}
                                {filteredPhotos[3] && <div className='w-1/2 lg:w-1/2 ' onClick={() => openModal(3)}>
                                    <img src={filteredPhotos[3]?.vertical_image} alt="" className='  md:h-[282px] h-[87px] w-full cursor-pointer' />

                                </div>}
                            </div>

                            <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[4] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(4)}>
                                    <img src={filteredPhotos[4]?.horizontal_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                                </div>}
                                {filteredPhotos[5] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(5)}>
                                    <img src={filteredPhotos[5]?.horizontal_image} alt="" className='cursor-pointer h-[178px] md:h-[556px] md:w-[325px] ' />

                                </div>}
                                {filteredPhotos[6] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(6)}>
                                    <img src={filteredPhotos[6]?.horizontal_image} alt="" className='  md:h-[556px]  h-[178px] md:w-[325px] cursor-pointer' />

                                </div>}
                            </div>

                            <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[7] && <div className='w-1/2 lg:w-1/2 '>
                                    <img src={filteredPhotos[7].vertical_image} alt="" className='md:h-[282px]  h-[87px] w-full object-cover cursor-pointer ' onClick={() => openModal(7)} />

                                </div>}
                                {filteredPhotos[8] && <div className='w-1/2 lg:w-1/2 '>
                                    <img src={filteredPhotos[8]?.vertical_image} alt="" className='  md:h-[282px] h-[87px] w-full object-cover cursor-pointer ' onClick={() => openModal(8)} />

                                </div>}
                            </div>
                            <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[9] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(9)}>
                                    <img src={filteredPhotos[9]?.horizontal_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                                </div>}
                                {filteredPhotos[10] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(10)}>
                                    <img src={filteredPhotos[10]?.horizontal_image} alt="" className='cursor-pointer h-[178px]  md:h-[556px] md:w-[325px] ' />

                                </div>}
                                {filteredPhotos[11] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(11)}>
                                    <img src={filteredPhotos[11]?.horizontal_image} alt="" className=' h-[178px]  md:h-[556px] md:w-[325px] cursor-pointer' />

                                </div>}
                            </div>
                            <div className=' flex flex-row items-center justify-evenly  gap-[1%] mb-2 md:mb-5 '>
                                {filteredPhotos[12] && <div className='w-1/3 lg:w-1/3 cursor-pointer ' onClick={() => openModal(12)}>
                                    <img src={filteredPhotos[12]?.horizontal_image} alt="" className='md:h-[556px] h-[178px] md:w-[325px] cursor-pointer ' />

                                </div>}
                                {filteredPhotos[13] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(13)}>
                                    <img src={filteredPhotos[13]?.horizontal_image} alt="" className='cursor-pointer h-[178px] md:h-[556px] md:w-[325px] ' />

                                </div>}
                                {filteredPhotos[14] && <div className='w-1/3 lg:w-1/3 ' onClick={() => openModal(14)}>
                                    <img src={filteredPhotos[14]?.horizontal_image} alt="" className='  md:h-[556px] h-[178px] md:w-[325px] cursor-pointer' />

                                </div>}
                            </div>
                        </div>
                    </div>) : (<div className="flex h-32 justify-center items-center">
                        <img src="loader.gif" alt="" className='w-[300px]   my-44' />

                    </div>)
                }

            </div>

            <Modal show={isModalOpen} onClose={closeModal} size="4xl" className="backdrop-blur-lg min-h-[100vh] z-50 padding-0" {...handlers}>
                <Modal.Body>
                    <div className="relative padding-0">
                        <span className='absolute top-0 right-0 z-50 p-2 '><Button text={"✕"} onClick={closeModal} /></span>
                        <div className="lg:pt-0 pt-36 flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center  w-full mt-8 top-22">
                                <span className='absolute left-3 md:left-6 z-40 hidden lg:block '><Button text={"←"} onClick={prevPhoto} /></span>
                                {
                                    (currentPhotoIndex == 0 || currentPhotoIndex == 1 || currentPhotoIndex == 2 || currentPhotoIndex == 3 || currentPhotoIndex == 7 || currentPhotoIndex == 8) ? (

                                        <img src={filteredPhotos[currentPhotoIndex]?.vertical_image} alt="Modal" className="max-w-full w-[100%] lg:w-[85%]  md:h-[85vh] h-[270px]  object-fill" />
                                    ) :
                                        (
                                            <img src={filteredPhotos[currentPhotoIndex]?.horizontal_image} alt="Modal" className="max-w-full w-[100%] lg:w-[85%]  md:h-[85vh] h-[270px]  object-fill" />
                                        )
                                }

                                <span className=' absolute right-3 md:right-6 z-40 hidden lg:block'><Button text={"→"} onClick={nextPhoto} /></span>
                            </div>
                            <div className="text-center">
                                {currentPhotoIndex + 1} / {filteredPhotos.length}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}
