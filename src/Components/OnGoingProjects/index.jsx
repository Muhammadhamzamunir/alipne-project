import React, { useEffect, useState } from 'react';
import Button from '../Button';
import 'react-multi-carousel/lib/styles.css';
import './index.css';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import OnGoingProject_bg from '../../assets/images/OnGoingProject_bg.png';
import { Link } from 'react-router-dom';
import API_Call from '../API_Call';
export default function OnGoingProjects() {
  const [ongoingProjects, setOngoingProject] = useState(null);
  const { fetchData, loader } = API_Call();
  const navigate = useNavigate();
  const getData = async () => {
    const data = await fetchData("ongoingproject");
    return data;
  }

  useEffect(() => {
    getData().then((data) => {
      setOngoingProject(data)
    });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 5
    }
  };
  return (
    <div className="bg-secondary bg-cover bg-left bg-no-repeat" style={{ backgroundImage: `url(${OnGoingProject_bg})`, backgroundSize: 'auto', backgroundPosition: 'left' }}>
      <div className="  is-flex flex-wrap md:pl-[110px] pt-10 md:pb-20" >
        <div data-aos="slide-left" className='w-full lg:w-[35%] flex flex-col px-5 md:gap-y-16 '>
          <h1 className="text-3xl custom-font leading-10 tracking-tight  sm:leading-none md:text-4xl uppercase ">
            Ongoing Projects
          </h1>
          <div className=" mx-auto text-lg lg:pr-12 text-gray-200 md:text-xl md:max-w-3xl leading-10 font-light tracking-tight mb-4">
            <p className='lg:pl-3'>
              "Beyond Walls: Architectural Facades as Statements of Style and Substance."
            </p>
          </div>
          {/* this will be show only on Mobile Screen  */}
          <div className='w-full md:w-[90%] m-auto flex flex-col gap-y-4 lg:hidden'>

            {
              ongoingProjects ? (ongoingProjects.slice(0, 3).map((project, index) => (
                <div key={index} className="w-full h-[236px] relative group cursor-pointer" onClick={() => navigate(`/ongoing-project/${project?.id}`)}>



                  <img src={project.horizontal_image?.[0]?.url} alt="" className="w-full h-[236px] object-cover transition duration-500 ease-in-out hover:opacity-50" />

                  <div className='absolute bottom-[10px] text-white flex justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                    <h3 className='ml-2 w-[95%] text-[22px]  break-all '>{project.project_name}</h3>
                    <span className='mr-2  justify-end '>
                      <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" stroke-width="0.6" />
                        <g opacity="0.6">
                          <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                        </g>
                      </svg>

                    </span>
                  </div>

                </div>

              ))) : ""
            }


          </div>
          <div className="md:text-left mt-4 md:mt-0 btn-fix">
            <Link to="/on-going-project-list"> <Button text={"View All"} /></Link>
          </div>
        </div>

        <div className="md:w-[65%] hidden lg:block" >

          {/* this will be show only on bigger Screen  */}
          {
            ongoingProjects ? (
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}

              >
                {ongoingProjects.slice(0, 5).map((project, index) => (
                  <div key={index} className="w-[508px] h-[336px] relative group cursor-pointer">
                    <Link to={`/ongoing-project/${project.id}`}>
                      <img
                        src={project.horizontal_image?.[0]?.url}
                        alt=""
                        className="w-[508px] h-[336px] object-fill transition duration-500 ease-in-out hover:opacity-50"
                      />
                      <div className='absolute bottom-[10px] text-white flex justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                        <h3 className='ml-2 text-[22px]'>{project.project_name}</h3>
                        <span className='mr-2'>
                          <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                            <g opacity="0.6">
                              <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </Carousel>) : (<div className="flex h-32 justify-center items-center m-auto p-[150px]">
                <img src="loader.gif" alt="" className='w-[200px]  my-44' />

              </div>)
          }

        </div>


      </div>
      {/* this Button will be show only on Mobile Screen  */}
      <div className="flex justify-end right-0 pr-6 pt-4  btm-btn ">
        <Link to="/on-going-project-list"> <Button text={"View All"} /></Link>
      </div>
    </div>
  );
}