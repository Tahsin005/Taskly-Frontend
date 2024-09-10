import './Hero.css'
import gbook from "../assets/images/girl_with_book.png";
import sGirl from "../assets/images/staring_girl.png";
import rightArrow from "../assets/images/arrow_right_alt.png";
import icon1 from "../assets/images/little_icon_man.png";
import icon2 from '../assets/images/liitle_icon_man_2.png'
import blurr from '../assets/images/ellips_1.png'
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <div className='mb-12'>
            <div className="blur-effects absolute ">
                <img src={blurr} alt="" />
            </div>
            <div className="mt-12">
                <div className="text-center text-4xl md:text-7xl font-bold mb-12">
                    <p>Get Set Done,</p>
                    <p className="">Stress Less</p>
                </div>
                <section className="mt-24 mx-auto max-w-screen-xl pb-12  items-center lg:flex md:px-8">
                    <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                        <h1 className="text-white font-bold text-5xl xl:text-6xl">
                            Your tasks more organized
                            <span className="text-[#9FE88D]"> more precise</span>
                        </h1>
                        <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                        Experience a streamlined workflow with our task management system.
                        </p>
                    </div>
                    <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
                        <img src={gbook} className="w-full mx-auto sm:w-10/12  lg:w-full" />
                    </div>
                </section>
                <div className='flex justify-evenly bg-[#9FE88D] text-gray-900 rounded-sm h-20 text-lg md:text-xl font-bold items-center'>
                    <p>Create Account</p>
                    <p>Add Task</p>
                    <p>Save Automatically</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;