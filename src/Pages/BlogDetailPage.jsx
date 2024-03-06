
import React, { useEffect, useState } from 'react';
import background_image from "../assets/images/blog-detail-bg.png";
import Blogs from '../Components/Blogs';
import API_Call from '../Components/API_Call';
import { useParams } from 'react-router-dom';

export default function BlogDetailPage() {
    const { fetchData } = API_Call();
    const [blogData, setBlogData] = useState([]);
    const [totalNumberofWords, settotalNumberofWords] = useState();
    const { id } = useParams();

    // Fetching data 
    const getData = async () => {
        try {
            const data = await fetchData(`blog/${id}`, "POST");
            setBlogData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (blogData?.length > 0) {
            const totalWords = blogData[0]?.content.split(' ').length;
            settotalNumberofWords(totalWords);
        }
    }, [blogData]);

    const handleUpArrowClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        handleUpArrowClick();
    }, []);

    const getContentSlice = (start, end) => {
        const wordsPerSection = Math.floor(totalNumberofWords / 4);
        const startIndex = start * wordsPerSection;
        const endIndex = end * wordsPerSection;

        return blogData[0]?.content
            .split(' ')
            .slice(startIndex, endIndex)
            .join(' ')
            .split('\n')
            .map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ));
    };

    return (
        <>
            {blogData && blogData.length>0
             ? (
                <div className="md:flex justify-center items-center w-full relative lg:bottom-24 md:bottom-1 bottom-0 sm:bottom-5 md:mb-0">
                    <div className="md:w-3/4 sm:w-full px-6 md:px-0">
                        <h6 className='mb-2 text-amber-600 text-[#C1AE69]'>Home &gt; Blog list &gt; Blog detail</h6>
                        <h1 className='font-audiowide text-[20px] md:text-3xl pb-3 uppercase'>{blogData[0].title}</h1>
                        <p className='font-light leading-loose tracking-wider'>
                            {getContentSlice(0, 1)}
                        </p>
                        {blogData[0].horizontal_image[0] && (
                            <img src={blogData[0].horizontal_image[0].url} alt="NO Image" className='w-full lg:h-[500px] h-[180px] object-cover aspect-square my-8' />
                        )}

                        <div className='bg-cover' style={{ backgroundImage: ` url(${background_image})` }}>
                            <p className='font-light leading-loose tracking-wider'>
                                {getContentSlice(1, 2)}
                            </p>

                            <div className="flex flex-col lg:flex-row gap-y-8 my-12">
                                {blogData[0].horizontal_image[1] && (
                                    <div className='lg:w-[50%] w-full h-[213px]lg:h-[334px] lg:mr-3'>
                                        <img src={blogData[0].horizontal_image[1].url} alt="" className='w-full h-full object-cover' />
                                    </div>
                                )}
                                {blogData[0].horizontal_image[2] && (
                                    <div className='lg:w-[50%] w-full h-[213px] lg:h-[334px] object-cover '>
                                        <img src={blogData[0].horizontal_image[2].url} alt="" className='w-full h-full' />
                                    </div>
                                )}
                            </div>

                            <p className='font-light leading-loose tracking-wider'>
                                {getContentSlice(2, 3)}
                            </p>



                            <div className='hidden lg:flex my-12'>
                                {blogData[0].verticle_image[0] && (
                                    <img src={blogData[0].verticle_image[0].url} alt="" className='w-[32%] h-[571px] mr-3' />
                                )}
                                {blogData[0].verticle_image[1] && (
                                    <img src={blogData[0].verticle_image[1].url} alt="" className='w-[32%] h-[571px] mr-3' />
                                )}
                                {blogData[0].verticle_image[2] && (
                                    <img src={blogData[0].verticle_image[2].url} alt="" className='w-[32%] h-[571px] ' />
                                )}
                            </div>

                            <p className='font-light leading-loose tracking-wider'>
                                {getContentSlice(3, 4)}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-[50vh]  justify-center items-center m-auto pt-[10px]">
                    <img src="loader.gif" alt="" className='w-[300px] md:py-44 md:my-44' />
                </div>
            )}
            <div className=''>
                <Blogs />
            </div>
        </>
    );
}