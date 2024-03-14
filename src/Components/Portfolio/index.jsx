import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Button from '../Button'
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API_Call from '../API_Call';
export default function Portfolio() {
  const leftscrollbar = useRef();
  const { fetchData, loader } = API_Call();
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [alldata, setAllData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  let filteredCategories = [];
  let allPortofolioData = [];

  const getData = async () => {
    const data = await fetchData("portfolio");

    //filtering the categories 
    data.forEach((item, index) => {
      const existedCategory = filteredCategories.find(category => category === item.category);
      if (!existedCategory) {
        filteredCategories.push(item.category);
      }
    });


    data.sort((a, b) => b.id - a.id).forEach((section) => {
      // checking horizontal image stored or not  
      const horizontalImageStored = allPortofolioData.find(data => (data.category === section.category && data.horizontal_image == true));
      // checking how many vertical image stored  
      const veritcalImageStored = allPortofolioData.filter(data => (data.category === section.category && data.vertical_image == true));
      //storing only 1 hortizontal image to the Array
      if (section.horizontal_image.length > 0 && !horizontalImageStored) {
        allPortofolioData.push({ "url": section.horizontal_image[0].url, "category": section.category, "horizontal_image": true, "id": section.id, "project_name": section.project_name });

      }
      else {
        //storing only 3 vertical images to the Array
        if (section.verticle_image.length > 0 && veritcalImageStored.length <= 2 && horizontalImageStored?.id != section.id) {
          allPortofolioData.push({ "url": section.verticle_image[0].url, "category": section.category, "vertical_image": true, "id": section.id, "project_name": section.project_name });

        }
      }
    })
    setAllData(allPortofolioData);
    setAllCategories(filteredCategories);
    console.log(allPortofolioData);
  }



  const handleClick = (event) => {
    event.preventDefault();
    const category = event.target.textContent;
    setActiveCategory(category);
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setActiveCategory(allCategories[0]);
  }, [allCategories]);


  useEffect(() => {
    const filteredPortfolioData = alldata?.filter(data => data.category === activeCategory) || [];

    // Sorting logic to prioritize horizontal_image
    filteredPortfolioData.sort((a, b) => {
      if (a.horizontal_image && !b.horizontal_image) {
        return -1;
      } else if (!a.horizontal_image && b.horizontal_image) {
        return 1;
      } else {
        return 0;
      }
    });

    setFilteredData(filteredPortfolioData);

  }, [activeCategory, alldata]);



  // this useEffect is used for making the page Responsive
  useEffect(() => {
    if (window.innerWidth < 1000) {
      leftscrollbar.current.classList.remove('tab-list');
      leftscrollbar.current.classList.add('overflow-x-auto');
    }
    const handleResize = () => {

      if (window.innerWidth < 1000) {
        leftscrollbar.current.classList.remove('tab-list');
        leftscrollbar.current.classList.add('overflow-x-auto');
      } else {
        leftscrollbar.current.classList.add('tab-list');
        leftscrollbar.current.classList.remove('overflow-x-auto');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);






  return (
    <div>
      <div className="outer-cont pt-2 lg:pt-24">
        <div className="md:w-[80%] w-[90%]  flex flex-col flex-wrap items-start justify-between md:flex-row sm:px-6  inner-cont" data-aos="fade-left">
          <div className='lg:w-1/5 w-full '   >
            <h2 className="text-3xl custom-font leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-4xl uppercase">
              Portfolio
            </h2>
          </div>
          <div className="  text-lg text-gray-200  md:text-xl  leading-10 font-light tracking-tight  w-full lg:w-[70%] md:mb-10  ">

            <p className='lg:pr-2'>
              At the heart of Alpine Architect lies a simple yet profound belief: architecture is not static. As society progresses, so too must our buildings and spaces. The firm places a premium on continuously upgrading its design ethos, always staying attuned to the shifting sands of societal needs, technological advancements, and aesthetic sensibilities.
            </p>
            <div className='btn-fix mt-3'>
              <Link to="/portfolio"> <Button text={" explore "} /></Link>

            </div>
          </div>

        </div>






        <div className=" flex flex-wrap md:w-[80%] w-[90%] m-auto sm:px-6">

          <div data-aos="fade-right" className='lg:w-[20%] w-full  mt-3 pr-2'>
            <ul ref={leftscrollbar} className='tab-list flex lg:flex-col gap-y-4 whitespace-wrap text-xl lg:h-auto lg:max-h-[552px] portfolio-links'>
              {
                allCategories.map((category) => (
                  <li key={category} className={activeCategory === category ? "active pr-8 lg:pr-0" : "pr-8 lg:pr-0"}>
                    <a href="#" onClick={(event) => handleClick(event, category)}>
                      {category}
                    </a>
                  </li>
                ))
              }


            </ul>
          </div>
          {/* i am doing thing just on client demand he wants a perfect deminsion that he demands */}
          {
            (filteredData && filteredData.length > 0) ? (
              <div className="lg:w-[80%]  w-full mt-3 lg:pl-4">

                <div className='flex flex-col lg:flex-row w-full gap-3 gap-y-2 mb-12 lg:h-[613px]'>
                  <div className='w-full flex flex-col-reverse lg:flex-col gap-3  lg:basis-[429px]  '>
                    {filteredData[0]?.url && (
                      <div className='relative group w-full h-[179px] lg:h-[240px] cursor-pointer' onClick={() => navigate(`/project/${filteredData[0].id}`)}
                      >
                        <img src={filteredData[0]?.url} alt="No Data" className='object-fill w-full h-full transition duration-500 ease-in-out hover:opacity-50' loading='lazy' />
                        <div className='absolute bottom-[10px]  text-white flex items-center justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                          <h3 className='ml-2 w-[95%] text-[22px]  break-all '>{filteredData[0]?.project_name}</h3>
                          <span className='mr-2  justify-end'>
                            <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" stroke-width="0.6" />
                              <g opacity="0.6">
                                <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                              </g>
                            </svg>

                          </span>
                        </div>
                      </div>)}

                    <div className='flex gap-3 w-full'>


                      {
                        filteredData[1]?.url && (<div className="relative group  w-[50%] lg:h-[360px] h-[259px] cursor-pointer" onClick={() => navigate(`/project/${filteredData[1].id}`)}>
                          <img
                            src={filteredData[1]?.url}
                            alt="No Data"
                            className="object-fill w-full h-full lg:h-full transition duration-500 ease-in-out hover:opacity-50"
                            loading="lazy"
                          />
                          <div className="absolute bottom-[10px] h-[80px] text-white flex items-end justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">

                            <h3 className="ml-2 w-[ 95%] text-[22px]  break-all">{filteredData[1]?.project_name}</h3>


                            <span className='  justify-end'>
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
                        filteredData[2]?.url && (<div className='relative group  w-[50%] lg:h-[360px] h-[259px] object-fill cursor-pointer' onClick={() => navigate(`/project/${filteredData[2].id}`)}>
                          <img src={filteredData[2]?.url} alt="No Data" className='object-fill w-full h-full lg:h-full transition duration-500 ease-in-out hover:opacity-50' loading='lazy' />

                          <div className='absolute bottom-[10px]  text-white flex items-center justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                            <h3 className='ml-2 w-[95%] text-[22px]  break-all'>{filteredData[2]?.project_name}</h3>
                            <span className='mr-2   justify-end'>
                              <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" stroke-width="0.6" />
                                <g opacity="0.6">
                                  <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                                </g>
                              </svg>

                            </span>
                          </div>
                        </div>)
                      }

                    </div>
                  </div>

                  {filteredData[3]?.url && (<div className='lg:basis-[358px] h-[179px] lg:h-full cursor-pointer ' onClick={() => navigate(`/project/${filteredData[3].id}`)}>
                    <div className='relative group'>
                      <img src={filteredData[3]?.url} alt="No Data" className='object-fill w-full h-[216px] lg:h-[613PX] transition duration-500 ease-in-out hover:opacity-50' loading='lazy' />
                      <div className='absolute bottom-[10px] text-white flex items-center justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                        <h3 className='ml-2 w-[ 95%] text-[22px]  break-all'>{filteredData[3]?.project_name}</h3>
                        <span className='  justify-end'>
                          <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" stroke-width="0.6" />
                            <g opacity="0.6">
                              <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                            </g>
                          </svg>

                        </span>                  </div>
                    </div>
                  </div>)}


                </div>


                <div className="md:text-right  mt-4 lg:-mt-8 flex justify-end lg:pr-1">
                  <Link to="/portfolio"> <Button text={"View All"} /></Link>
                </div>

              </div>
            ) : (<div className="flex lg:h-[613px] justify-center items-center m-auto pt-2">
              <img src="loading-gif.gif" alt="" className='w-[100px] bg-blend-multiply my-44' />

            </div>)
          }

        </div>

      </div>
    </div>
  )
}
