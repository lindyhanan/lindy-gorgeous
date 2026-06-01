<<<<<<< HEAD
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingButton() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Halo%20Doge%20Caffe,%20saya%20ingin%20bertanya."
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-6
        right-6
        w-16
        h-16
        rounded-full
        bg-[#9E6457]
        text-white
        shadow-[0_8px_20px_rgba(0,0,0,0.25)]
        flex
        items-center
        justify-center
        hover:scale-110
        hover:bg-[#855347]
        transition-all
        duration-300
        z-50
      "
    >
      <FaWhatsapp size={30} />
    </a>
  );
=======
export default function FloatingButton() {
  return (
    <button className='fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#8B5E3C] text-2xl shadow-lg'>
      +
    </button>
  )
>>>>>>> 3d93e1fbf9eb9ea88d4c4fb1573108f2661a17fd
}