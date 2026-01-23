import os
from pathlib import Path
from PIL import Image

def convert_images_to_webp(directory_path):
    """
    Converts all images in the specified directory to WebP format.
    Skips files that already exist in WebP format.
    """
    directory = Path(directory_path)
    
    if not directory.exists():
        print(f"Directory not found: {directory}")
        return

    # Supports common image formats
    valid_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff'}
    
    print(f"Scanning directory: {directory}")
    
    count = 0
    for file_path in directory.rglob('*'):
        if file_path.is_file() and file_path.suffix.lower() in valid_extensions:
            # Construct new filename with .webp extension
            webp_path = file_path.with_suffix('.webp')
            
            if webp_path.exists():
                print(f"Skipping (already exists): {file_path.name} -> {webp_path.name}")
                continue
                
            try:
                with Image.open(file_path) as img:
                    print(f"Converting: {file_path.name} -> {webp_path.name}")
                    # Save as WebP
                    img.save(webp_path, 'WEBP', quality=85)
                    count += 1
            except Exception as e:
                print(f"Error converting {file_path.name}: {e}")

    print(f"Conversion complete. {count} images converted.")

if __name__ == "__main__":
    # Adjust path relative to the script location
    # Script is in /scripts, images are in /public/images
    project_root = Path(__file__).parent.parent
    images_dir = project_root / "public" / "images"
    
    convert_images_to_webp(images_dir)
