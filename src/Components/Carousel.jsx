import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import API_Call from '../Components/API_Call'
import BlogsSliderIMG1 from '../assets/images/webpi (4).png';
import BlogsSliderIMG2 from '../assets/images/webpi (2).png';
import BlogsSliderIMG3 from '../assets/images/webpi (3).png';
import './Carousel.css';
import { useNavigate } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
export default function Carousel_Diversity(props) {
  const navigate = useNavigate();
  const openedCategory = props.category
  const page = props.page
  console.log(page);
  const { fetchData, loader } = API_Call();
  const [categoriesData, setCategoriesData] = useState([]);
  let uniqueCategories = [];
  const getCategories = async () => {
    const data = await fetchData(`categories`);

    return data;
  }



  const getDataAgainstCategory = async () => {
    console.log(uniqueCategories);
    if (uniqueCategories.length > 0) {
      let data;
      if (page === "ongoingProject") {
        data = await fetchData(`ongoingproject?category_id=${uniqueCategories[0].id}`);
      } else {
        data = await fetchData(`portfolio?category_id=${uniqueCategories[0].id}`);
      }


      setCategoriesData(data)
    }

  }
  useEffect(() => {
    getCategories().then((data) => {
      if (data) {
        // console.log(data);
        const exitedCategory = data.find((category) => { category.name === openedCategory })
        data.forEach(element => {
          if (element.name === openedCategory) {
            uniqueCategories.push(element)
            return -1;
          }

        });

        getDataAgainstCategory();
      }


    });
  }, []);






  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    arrows: true,
    autoplay: true,
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
    <div className='mt-6 z-0 relative'>
      <h1 className='font-audiowide text-2xl md:text-3xl uppercase mr-4 relative z-10'>Project diversity</h1>
      <p className='font-light leading-loose tracking-wider relative z-0'>"Discover Our Passion for Creating Timeless and Innovative Designs"</p>

      {
        categoriesData.length > 0 ? (<Slider {...settings}>

          {
            categoriesData.map((category) => (
              <div
                className='w-full lg:w-[32%] h-[190px] lg:h-[203px] relative group cursor-pointer'
                onClick={() => navigate(page === "ongoingProject" ? `/ongoing-project/${category.id}` : `/project/${category.id}`)}
              >
                <img src={category.horizontal_image[0]?.url} alt="" className='object-cover w-full h-full transition duration-500 ease-in-out hover:opacity-50' loading='lazy' />
                <div className='absolute bottom-[10px] text-white flex justify-between items-center w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
                  <h3 className='ml-2 text-[22px] '>{category.project_name}</h3>
                  <svg width="28" className='mr-2' height="25" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.3" y="0.3" width="27.4" height="22.4588" rx="11.2294" stroke="white" strokeWidth="0.6" />
                    <g opacity="0.6">
                      <path d="M8.75488 16.2073L16.7062 8.25594H11.7582V6.75427H19.2666V14.2626H17.7649V9.31461L9.81356 17.2659L8.75488 16.2073Z" fill="white" />
                    </g>
                  </svg>
                </div>

              </div>))
          }

        </Slider>) : ("Loading Data")
      }
    </div>
  );
}
