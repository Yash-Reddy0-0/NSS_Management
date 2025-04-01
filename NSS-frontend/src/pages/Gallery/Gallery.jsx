import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  X, 
  Download, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  Heart
} from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Sample categories - replace with your actual categories from API
  const categories = ["All", "Blood Donation", "Cleanliness Drive", "Awareness Camp", "Tree Plantation"];

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
          category: program.category || "Uncategorized", // Add category if available
          title: program.title || "NSS Activity",
          date: program.date || ""
        }))
      );
      setImages(allImages);
      setFilteredImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterImages = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  };

  const openImageViewer = (index) => {
    setSelectedImage(filteredImages[index]);
    setCurrentIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const downloadImage = async (imageUrl) => {
    try {
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
    }
  };

  const shareImage = async () => {
    try {
      await navigator.share({
        title: "NSS Gallery",
        text: `Check out this NSS activity: ${selectedImage.title}`,
        url: `http://localhost:4000/${selectedImage.url}`
      });
    } catch (error) {
      console.log("Sharing failed, falling back to copy", error);
      navigator.clipboard.writeText(`http://localhost:4000/${selectedImage.url}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">NSS Gallery</h1>
        <p className="text-lg text-gray-600">
          Capturing our journey of service and community impact
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap justify-center gap-3">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterImages(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              onClick={() => openImageViewer(index)}
            >
              <img
                src={`http://localhost:4000/${img.url}`}
                alt={img.title}
                loading="lazy"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{img.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded-full text-white">
                    {img.category}
                  </span>
                  <span className="text-xs text-white/80">{img.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImageViewer}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl w-full">
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={`http://localhost:4000/${selectedImage.url}`}
                alt={selectedImage.title}
                className="max-h-[80vh] object-contain rounded-lg"
              />
              <div className="bg-white w-full max-w-2xl rounded-b-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <div className="flex items-center mt-1 gap-4">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {selectedImage.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedImage.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); downloadImage(selectedImage.url); }}
                      className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); shareImage(); }}
                      className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredImages.length === 0 && (
        <div className="max-w-7xl mx-auto bg-white rounded-xl p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Heart className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No images found
          </h3>
          <p className="text-gray-600">
            {activeFilter === "All"
              ? "Our gallery is currently empty. Check back soon!"
              : `No images found for ${activeFilter}. Try another filter.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;