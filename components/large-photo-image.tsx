"use client";
import { MouseEvent, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface FullscreenGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPrev, setIsPrev] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
  });

  const handleCloseBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNext = () => {
    setIsPrev(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setIsPrev(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center"
      {...handlers}
      onClick={handleCloseBackdrop}
    >
      <AnimatePresence>
        <motion.div
          key={images[currentIndex]}
          initial={{ opacity: 0, x: isPrev ? -500 : 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isPrev ? 500 : -500 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative h-[90%] w-full"
        >
          <Image
            src={`${process.env.BACKEND_URL}/products/${images[currentIndex]}`}
            alt="Gallery Image"
            fill
            objectFit="contain"
            priority={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Кнопка закриття */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        &#10005;
      </button>

      {/* Кнопки навігації */}
      <button
        onClick={handlePrev}
        className="absolute left-4 text-white text-2xl"
      >
        &#10094;
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 text-white text-2xl"
      >
        &#10095;
      </button>
    </div>
  );
};

export default FullscreenGallery;
