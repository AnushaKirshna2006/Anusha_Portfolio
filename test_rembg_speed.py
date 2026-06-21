import imageio.v3 as iio
import time
from rembg import remove, new_session
from PIL import Image
import numpy as np

try:
    frames = iio.imread("public/assets/videos/hero_video.mp4", plugin="pyav")
    print(f"Total frames: {len(frames)}")
    
    session = new_session("u2net")
    img = Image.fromarray(frames[0])
    
    start = time.time()
    out = remove(img, session=session)
    end = time.time()
    
    print(f"Time for one frame: {end - start:.2f} seconds")
    print(f"Estimated time for whole video: {(end - start) * len(frames) / 60:.2f} minutes")
except Exception as e:
    print(f"Error: {e}")
