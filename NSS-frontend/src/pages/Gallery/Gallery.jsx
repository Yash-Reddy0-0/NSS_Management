import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/programs");
      const allImages = response.data.flatMap((program) => program.images);
      setImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const openImageViewer = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const showNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const showPrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openImageViewer(index)}
          >
            <img src={`http://localhost:4000/${img}`} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-viewer" onClick={closeImageViewer}>
          <div className="viewer-content">
            <button className="prev-btn" onClick={(e) => { e.stopPropagation(); showPrevImage(); }}>❮</button>
            <img src={`http://localhost:4000/${selectedImage}`} alt="Selected" className="viewer-image" />
            <button className="next-btn" onClick={(e) => { e.stopPropagation(); showNextImage(); }}>❯</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
