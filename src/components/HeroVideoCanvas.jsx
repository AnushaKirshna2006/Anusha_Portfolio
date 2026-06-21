import React, { useRef, useEffect, forwardRef } from 'react';

const HeroVideoCanvas = forwardRef(({ isMuted }, videoRef) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    let animationFrameId;

    const drawFrame = () => {
      if (!video || !canvas) return;

      // Only process and draw if the video has loaded its first frame
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;

          // If the pixel is grey/white, make it transparent
          if (diff < 35 && max > 70) {
            data[i + 3] = 0;
          } else if (diff < 50 && max > 60) {
            data[i + 3] = 100;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      // Loop continuously regardless of pause state to ensure first frame is always rendered
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    // Start the render loop immediately
    drawFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <>
      <video
        ref={videoRef}
        src="/assets/videos/hero_video.mp4"
        crossOrigin="anonymous"
        autoPlay
        loop
        playsInline
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        width={500}
        height={666}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </>
  );
});

export default HeroVideoCanvas;
