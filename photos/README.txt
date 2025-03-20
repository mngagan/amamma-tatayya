PHOTO GALLERY INSTRUCTIONS

This directory contains the photos for your memorial website. To add photos to the gallery:

1. Place your photo files (.jpg, .jpeg, .png, .gif) in this directory

2. Update the photos.json file to include all your photos. The format is:

{
  "photos": [
    {
      "src": "filename1.jpg",
      "caption": "Caption for photo 1"
    },
    {
      "src": "filename2.jpg",
      "caption": "Caption for photo 2"
    }
    ... and so on
  ]
}

IMPORTANT NOTES:
- Make sure the "src" value exactly matches your filename
- The "caption" is optional but recommended
- Keep the JSON format valid (no comments, proper commas, etc.)
- You can name your photos however you like - no specific naming required 