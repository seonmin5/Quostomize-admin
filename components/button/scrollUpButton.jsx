import { FaArrowCircleUp } from "react-icons/fa";

const ScrollUpButton = () => {
  return (
    <div 
      className="flex justify-center items-center sticky w-12 h-12 rounded-3xl bg-slate-400/50 cursor-pointer hover:animate-bounce bottom-0 text-content-accent1"
      onClick={() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
      }}
    >
      <FaArrowCircleUp className="w-6 h-6"/>
    </div>
  )
}

export default ScrollUpButton