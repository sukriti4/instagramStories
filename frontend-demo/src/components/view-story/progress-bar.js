import { useEffect, useRef } from 'react';

const ProgressBar = ({
  videoIndex,
  total,
  paused
}) => {
  const progressRef = useRef();

  useEffect(() => {
    if (!progressRef.current) return;

    const bars = Array.from(progressRef.current.children);
    bars.forEach((bar, index) => {
      let barWidth = parseFloat(100/bars.length);
    
      bar.style.width = `${barWidth}%`;
      if (index === videoIndex && !paused) {
        bar.querySelector('.progress-bar').style.width = '100%';
        bar.querySelector('.progress-bar').style.transition = 'width 5s linear';
      } else {
        bar.querySelector('.progress-bar').style.width = '0%';
        bar.querySelector('.progress-bar').style.transition = 'none';
      }
    });
  }, [videoIndex, paused]);

  return (
    <div className="progress-container" ref={progressRef}>
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="progress-track hfull">
          <div className="progress-bar hfull" />
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
