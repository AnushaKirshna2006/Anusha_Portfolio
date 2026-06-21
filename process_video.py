import os
import subprocess
import imageio.v3 as iio
import imageio_ffmpeg
from rembg import remove, new_session
from PIL import Image
import numpy as np
import time

def main():
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    input_video = "public/assets/videos/hero_video.mp4"
    audio_file = "public/assets/videos/temp_audio.aac"
    temp_video = "public/assets/videos/temp_video.webm"
    final_video = "public/assets/videos/hero_video_nobg.webm"

    # 1. Extract audio
    print("Extracting audio...")
    subprocess.run([ffmpeg_exe, "-y", "-i", input_video, "-vn", "-acodec", "copy", audio_file], check=False)

    # 2. Extract and process frames
    print("Processing frames with rembg (this will take ~10 minutes)...")
    frames = iio.imread(input_video, plugin="pyav")
    fps = 30 # default
    try:
        meta = iio.immeta(input_video, plugin="pyav")
        if "fps" in meta: fps = meta["fps"]
    except: pass
    
    session = new_session("u2net")
    out_frames = []
    
    start_time = time.time()
    for i, frame in enumerate(frames):
        if i % 10 == 0:
            print(f"Processing frame {i}/{len(frames)}")
        img = Image.fromarray(frame)
        out = remove(img, session=session)
        out_frames.append(np.array(out))
    
    # 3. Write temp WebM with Alpha using FFmpeg directly from PNGs
    print("Writing temporary PNG frames...")
    temp_dir = "public/assets/videos/temp_frames"
    os.makedirs(temp_dir, exist_ok=True)
    for i, frame in enumerate(out_frames):
        Image.fromarray(frame).save(os.path.join(temp_dir, f"frame_{i:04d}.png"))

    print("Combining audio and video into WebM...")
    if os.path.exists(audio_file):
        subprocess.run([
            ffmpeg_exe, "-y",
            "-framerate", str(fps),
            "-i", os.path.join(temp_dir, "frame_%04d.png"),
            "-i", audio_file,
            "-c:v", "libvpx-vp9",
            "-pix_fmt", "yuva420p",
            "-c:a", "libopus",
            final_video
        ], check=True)
        os.remove(audio_file)
    else:
        print("No audio found, creating video only.")
        subprocess.run([
            ffmpeg_exe, "-y",
            "-framerate", str(fps),
            "-i", os.path.join(temp_dir, "frame_%04d.png"),
            "-c:v", "libvpx-vp9",
            "-pix_fmt", "yuva420p",
            final_video
        ], check=True)
        
    # Cleanup frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)
        
    print(f"Done in {(time.time() - start_time) / 60:.2f} minutes!")

if __name__ == "__main__":
    main()
