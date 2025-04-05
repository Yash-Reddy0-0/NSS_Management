import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/api/programs");
      const allImages = response.data.flatMap((program) => 
        program.images.map(img => ({
          url: img,
          category: program.category || "Activity",
          title: program.title || "NSS Program",
          date: program.date || ""
        }))
      );
      setImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openImageViewer = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const downloadImage = async (imageUrl) => {
    try {
      setIsDownloading(true);
      const response = await fetch(`http://localhost:4000/${imageUrl}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `nss-gallery-${Date.now()}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header with animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 mb-4">
          NSS Gallery
        </h1>
        <p className="text-lg text-gray-600">
          Capturing our journey of service and community impact
        </p>
      </motion.div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => openImageViewer(index)}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={`http://localhost:4000/${img.url}`}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{img.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full text-white shadow-md">
                      {img.category}
                    </span>
                    <span className="text-xs text-white/90">{img.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Image Viewer Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeImageViewer}
          >
            <motion.div 
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center">
                <motion.img
                  src={`http://localhost:4000/${selectedImage.url}`}
                  alt={selectedImage.title}
                  className="max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm w-full max-w-2xl rounded-b-lg p-4 mt-2 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
                      <div className="flex items-center mt-1 gap-4">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded shadow">
                          {selectedImage.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {selectedImage.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); downloadImage(selectedImage.url); }}
                        className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition shadow"
                        title="Download"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isDownloading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!isLoading && images.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto bg-white rounded-xl p-12 text-center shadow-lg"
        >
          <div className="text-gray-400 mb-4">
            <Heart className="w-12 h-12 mx-auto animate-pulse" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Gallery is empty
          </h3>
          <p className="text-gray-600">
            No images available yet. Check back later!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;