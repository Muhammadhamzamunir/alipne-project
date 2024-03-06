import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import API_Call from '../Components/API_Call';
import { useNavigate } from 'react-router-dom';
export default function Portfolio() {
    const { fetchData } = API_Call();
    const [allImages, setAllImages] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [displayedImagesCount, setDisplayedImagesCount] = useState(6);
    const [contentList, setContentList] = useState([]);
    const categories = ["All"];
    const navigate = useNavigate();
    const getData = async () => {
        const data = await fetchData("portfolio");
        // const data = [
        //     {
        //         "id": 4,
        //         "category": "Institutional",
        //         "project_name": "title",
        //         "location": "dscsd",
        //         "area": "sdcsdc",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/67/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/68/horizontal_image_0.png"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 5,
        //         "category": "Insdustrial & Infrastructure",
        //         "project_name": "test2",
        //         "location": "fsdfsdf",
        //         "area": "sdfsdfsdf",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/69/vertical_demo_0.png"
        //             },
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/70/vertical_demo_1.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/71/horizontal_image_0.png"
        //             },
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/72/horizontal_image_1.png"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 6,
        //         "category": "Landscape & Urbanism",
        //         "project_name": "test1",
        //         "location": "das",
        //         "area": "adsasd",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/85/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/86/horizontal_image_0.png"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 7,
        //         "category": "Master Planning",
        //         "project_name": "test",
        //         "location": "daSD",
        //         "area": "SDASD",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/95/vertical_demo_0.png"
        //             },
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/96/vertical_demo_1.png"
        //             },
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/98/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/97/horizontal_image_0.png"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 15,
        //         "category": "Residential",
        //         "project_name": "rse",
        //         "location": "rerwe",
        //         "area": "werw",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/569/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/570/horizontal_image_0.png"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, , {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }, {
        //         "id": 16,
        //         "category": "Commercial",
        //         "project_name": "wewrwrww",
        //         "location": "erwerwe",
        //         "area": "werwr",
        //         "verticle_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/571/vertical_demo_0.png"
        //             }
        //         ],
        //         "horizontal_image": [
        //             {
        //                 "url": "https://architecture.flashcitytours.com/storage/572/horizontal_image_0.png"
        //             }
        //         ]
        //     }
        // ]
        if (data) {
            const allDataImages = data.map((item) => {
                const existedCategory = categories.find(category => category === item.category);
                if (!existedCategory) {
                    categories.push(item.category);
                }

                return {
                    "category": item.category,
                    "vertical_image": item.verticle_image[0]?.url,
                    "horizontal_image": item.horizontal_image[0]?.url,
                    "id": item.id,
                    "project_name": item.project_name
                };
            });

            setUniqueCategories(categories);
            setAllImages(allDataImages);
            setFilteredData(allDataImages);
        }
    }

    const filterPhotosByCategory = () => {
        if (activeCategory === "All") {
            setFilteredData(allImages);
        } else {
            const filtered = allImages.filter(item => item.category === activeCategory);
            setFilteredData(filtered);

        }
        setContentList([]);
    };

    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleLoadMoreClick = () => {
        setDisplayedImagesCount(prevCount => prevCount + 6);
        let newLoadedImages = imagesContainer(filteredData, displayedImagesCount)
        setContentList((prevContentList) => [...prevContentList, newLoadedImages]);
    }

    useEffect(() => {
        filterPhotosByCategory();
        setContentList([]);
        setDisplayedImagesCount(6)
    }, [activeCategory]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleUpArrowClick();
    }, []);

    return (
        <>
            <div className='relative  lg:bottom-24 md:bottom-1 bottom-0 sm:bottom-5'>
                <div className="md:flex justify-center items-center w-full mb-4  ">
                    <div className="md:w-3/4 sm:w-full px-6 md:px-3">
                        <h1 data-aos="fade-down" className='font-audiowide text-3xl pb-6 uppercase'>Portfolio</h1>
                        <p data-aos="fade-down" className='font-light leading-10 tracking-wider'>
                            At Alpine, our diverse portfolio reflects architectural excellence, blending innovation and sustainability. From commercial designs to residential spaces, each project showcases our commitment to client satisfaction. Explore our portfolio—A fusion of creativity and functionality defining our passion for inspiring and enduring spaces                    </p>
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
                    filteredData.length > 0 ? (<div className="md:flex justify-center items-center w-full relative mt-3  ">
                        <div className="md:w-3/4 sm:w-full px-6 md:px-3">



                            {imagesContainer(filteredData, 0)}

                            {contentList.map((content, index) => (
                                <div key={index}>{content}</div>

                            ))}



                            {
                                filteredData.length > displayedImagesCount && (<div className="my-10 flex justify-end">
                                    <Button text={"Load More"} onClick={handleLoadMoreClick} />
                                </div>)
                            }

                        </div>
                    </div>
                    ) : (<div className="flex lg:h-[613px] justify-center items-center m-auto pt-2">
                    <img src="loader.gif" alt="" className='w-[300px] bg-blend-multiply my-44' />
      
                  </div>)
                }
            </div>
        </>
    );




    function imagesContainer(filteredData, startingIndex = 0) {

        return (
            <div className='flex gap-2 mb-4 flex-wrap'>
                {
                    filteredData[startingIndex]?.vertical_image && (<div data-aos="fade-right" className=' w-full relative group lg:w-[67%] lg:h-[414px] h-[200px] transition duration-500 ease-in-out hover:opacity-50' style={{ position: 'relative', cursor: 'pointer' }
                    } onClick={() => navigate(`/project/${filteredData[startingIndex]?.id}`)
                    }>
                        <img className=' object-cover h-full'
                            src={filteredData[startingIndex]?.vertical_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div >)
                }

                {
                    filteredData[startingIndex + 1]?.horizontal_image && (<div data-aos="fade-right" className="w-[47%] relative group lg:w-[30%] lg:h-[414px] h-[265px]" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 1]?.id}`)}>
                        <img className='object-cover h-full transition duration-500 ease-in-out hover:opacity-50'
                            src={filteredData[startingIndex + 1]?.horizontal_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 1]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>

                    </div >)
                }
                {
                    filteredData[startingIndex + 2]?.horizontal_image && (<div data-aos="fade-right" className='w-[47%] relative group lg:w-[32%] lg:h-[479px] h-[265px] ' style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 2]?.id}`)}>
                        <img className=' object-cover h-full transition duration-500 ease-in-out hover:opacity-50'
                            src={filteredData[startingIndex + 2]?.horizontal_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 2]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>)
                }


                {
                    filteredData[startingIndex + 3]?.horizontal_image && (<div data-aos="fade-right" className="w-full relative group lg:w-[32%] lg:h-[479px] h-[200px] " style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 3]?.id}`)}>
                        <img className='object-cover h-full transition duration-500 ease-in-out hover:opacity-50'
                            src={filteredData[startingIndex + 3]?.horizontal_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 3]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>)
                }
                {
                    filteredData[startingIndex + 4]?.horizontal_image && (<div data-aos="fade-right" className="w-full relative group lg:w-[32%] lg:h-[479px] h-[200px] " style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 4]?.id}`)}>
                        <img className='object-cover h-full transition duration-500 ease-in-out hover:opacity-50'
                            src={filteredData[startingIndex + 4]?.horizontal_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 4]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>)
                }
                {
                    filteredData[startingIndex + 5]?.vertical_image && (<div data-aos="fade-right" className=' w-full relative group lg:w-[48%] lg:h-[289px] h-[200px] transition duration-500 ease-in-out hover:opacity-50' style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 5]?.id}`)}>
                        <img className=' object-cover h-full'
                            src={filteredData[startingIndex + 5]?.vertical_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 5]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>)
                }
                {
                    filteredData[startingIndex + 6]?.vertical_image && (<div data-aos="fade-right" className=' w-full relative group lg:w-[48%] lg:h-[289px] h-[200px] transition duration-500 ease-in-out hover:opacity-50' style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/project/${filteredData[startingIndex + 6]?.id}`)}>
                        <img className=' object-cover h-full'
                            src={filteredData[startingIndex + 6]?.vertical_image}
                            alt={""}
                            style={{ width: "100%", display: "block", opacity: 0.5 }}

                        />
                        <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[95%] text-[22px]  break-all">{filteredData[startingIndex + 6]?.project_name}</h3>


                            <span className=' justify-end mr-2'>
                                <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                                    <g opacity="0.6">
                                        <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                    </g>
                                </svg>
                            </span>

                        </div>
                    </div>)
                }


            </div >

        );
    }
}



