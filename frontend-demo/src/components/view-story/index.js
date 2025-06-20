import { useState, useEffect, useCallback } from 'react';
import ProgressBar from './progress-bar';
import styled from 'styled-components';

const ViewStoryWrapper = styled.div`
  position: fixed;
  inset: 0; 
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  &.open {
    opacity: 1;
    pointer-events: auto;
  }
  .story-viewer-content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    color: #fff;
    font-size: 2rem;
    border: none;
    cursor: pointer;
    z-index: 1100;
  }

  .close-button:hover {
    color: #ccc;
  }

  .story-image-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
    .user-card{
      position: absolute;
      top: 20px;
      left: 20px;
      .user-img{
        margin: 0;
        height: 40px;
        width: 40px;
        overflow: hidden;
        border-radius: 50%;
        img{
          height: 100%;
          width: 100%;
        }
      }
      figcaption{
        font-size: 10px;
        color: #1e5fcd;
      }
    }
  }

  .story-image {
    max-width: 100%;
    max-height: 95vh;
    object-fit: contain;
    user-select: none;
    border-radius: 4px;
  }

  .progress-container{
    position: absolute;
    top: 10px;
    background: rgb(187 187 187 / 15%);
    height: 4px;
    width: 100%;
    display: flex;
    z-index:1;
  }
  .hfull{
    height: 100%;
  }
  .progress-bar{
    background: #fff;
  }
`
const ViewStory = ({
  stories,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [videoIndex, setVideoIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleNext = useCallback(() => {
    setVideoIndex((prev) => (prev + 1)% stories[currentIndex].feedList.length);
  }, [stories[currentIndex].feedList.length]);

  const handlePrev = useCallback(() => {
    setVideoIndex((prev) => (prev - 1 + stories.length)% stories[currentIndex].feedList.length);
  }, [stories[currentIndex].feedList.length]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    },
    [handleNext, handlePrev, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(handleNext, 10000);
    return () => clearTimeout(timer);
  }, [videoIndex, paused, handleNext]);

  const handleOverlayClick = (e) => {
    const { clientX } = e;
    const screenWidth = window.innerWidth;
    if (clientX < screenWidth / 3) {
      handlePrev();
    } else if (clientX > (2 * screenWidth) / 3) {
      handleNext();
    } else {
      onClose();
    }
  };

  return (
    <ViewStoryWrapper className="story-viewer-overlay open" onClick={handleOverlayClick}>
      <div className="story-viewer-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <ProgressBar videoIndex={videoIndex} total={stories[currentIndex]?.feedList.length} paused={paused} />

        <div className="story-image-container">
          <div className='user-card'>
            <figure className='user-img'>
              <img src={stories[currentIndex]?.image} />
            </figure>
            <figcaption>{stories[currentIndex]?.feedList[videoIndex].videoTitle}</figcaption>
          </div>
          
          {
            <video 
              src={stories[currentIndex]?.feedList[videoIndex].videoSrc} 
              autoPlay 
              muted 
              playsInline 
            />  
          }
        </div>
      </div>
    </ViewStoryWrapper>
  );
};

export default ViewStory;
