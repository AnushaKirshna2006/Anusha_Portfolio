import av

try:
    container = av.open("public/assets/videos/hero_video.mp4")
    print(f"Video streams: {len(container.streams.video)}")
    print(f"Audio streams: {len(container.streams.audio)}")
    for stream in container.streams.audio:
        print(f"Audio stream: {stream}")
except Exception as e:
    print(f"Error: {e}")
