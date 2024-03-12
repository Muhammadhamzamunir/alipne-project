import React, { useState, useEffect } from 'react';
import './index.css';
import Button from '../Button';
import Blogs_bg from '../../assets/images/bg.png';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import API_Call from '../API_Call';
import { useNavigate } from 'react-router-dom';
export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);
  const { fetchData } = API_Call();
  //fetching data 
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData("blog");

        setBlogs(data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);


  //crousal settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div data-aos="fade-down" >

      <div className="bg-secondary pt-10  pb-16 bg-cover bg-left bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),url(${Blogs_bg})`, backgroundSize: 'auto', backgroundPosition: 'right' }}>
        <div className="flex flex-col items-start justify-between md:flex-row sm:px-6 lg:w-[80%] w-[90%] m-auto">
          <div className='w-1/5'>
            <h2 className="text-3xl  custom-font leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-4xl uppercase">
              Blogs
            </h2>
          </div>
          <div className="w-4/5 ">
            <div className="md:text-right mt-4 md:mt-0 btn-fix">
              <Link to="/blogs"><Button text={"View All"} /></Link>
            </div>
          </div>
        </div>
        <div className="sm:px-6 lg:w-[80%] w-[90%] m-auto">
          <div className='text-lg text-gray-200 font-light py-4 pb-4 '>
            <p>
              Explore our Blogs at Alpine Architect. Delve into insightful content offering a unique perspective on design, trends, and industry updates. Immerse yourself in a world where each read enhances your connection with our architectural vision.
            </p>
          </div>
          {blogs ? (
            <Slider {...settings}>

              {blogs.slice(0, 4).map((blog, index) => (

                <div key={index} className='w-full lg:w-[32%] h-[190px] border-none lg:h-[203px] relative group cursor-pointer' onClick={() => navigate(`/blog/${blog?.id}`)}>

                  <img src={blog.hero_image} alt="" className='object-fill w-full h-full transition duration-500 ease-in-out hover:opacity-50' loading='lazy' />
                  <div className='absolute bottom-[10px] text-white flex items-center justify-between w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                    <h3 className='ml-2 w-[85%] text-[20px] break-all'>
                      {blog.title.length > 20 ? blog.title.slice(0, 25) + '...' : blog.title}
                    </h3>
                    <span className='mr-2  justify-end'>
                      <svg width="28" height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                        <g opacity="0.6">
                          <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (<div className="flex h-32 justify-center items-center m-auto p-[120px]">
            <img src="loading-gif.gif" alt="" className='w-[70px]  my-44 bg-blend-darken' />

          </div>)}

          <div className="flex justify-end btm-btn pt-7">
            <Link to="/blogs">
              <Button text={"View All"} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}


