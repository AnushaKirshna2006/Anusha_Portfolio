from PIL import Image

def remove_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    # The background is a light pinkish/white gradient.
    # We will remove pixels that are very light.
    # For example, R > 200, G > 200, B > 200
    # Let's be a bit more precise to avoid removing her skin.
    # Her skin is around R=220, G=180, B=160.
    # The background is roughly R > 220, G > 210, B > 220.
    
    for item in data:
        r, g, b, a = item
        # Condition to find background: light purple/pink
        if r > 215 and g > 200 and b > 215:
            # check if it's not too red (to avoid removing skin highlights)
            # the background has high blue/red, skin has higher red but lower blue
            if b > 210:
                new_data.append((255, 255, 255, 0)) # transparent
            else:
                new_data.append(item)
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_bg(r"public\assets\images\Profile.jpeg", r"public\assets\images\Profile_nobg.png")
print("Done!")
