from rembg import remove
from PIL import Image

def main():
    print("Loading image...")
    input_path = "public/assets/images/Profile.png"
    output_path = "public/assets/images/Profile_final.png"
    
    input_img = Image.open(input_path)
    print("Removing background...")
    output_img = remove(input_img)
    
    print("Saving output...")
    output_img.save(output_path)
    print("Done!")

if __name__ == "__main__":
    main()
