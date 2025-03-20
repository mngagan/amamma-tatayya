# Memorial Website for Vudimudi Augusteen Rao & Deena Suseela Rani

A modern, respectful memorial website designed to honor the memory of Vudimudi Augusteen Rao and Vudimudi Deena Suseela Rani. This site is intended to be accessed via a QR code engraved on a tombstone.

## Features

- Clean, modern design with subtle animations
- Mobile-friendly responsive layout
- Timeline of important life events
- Photo gallery with lightbox viewing
- Special places section
- QR code generation for the memorial page
- Floating dots background animation inspired by memories.com

## Setup Instructions

### 1. Customize Content

You can personalize the website by editing the following files:

- **index.html**: Update the timeline events, quotes, and other personal information
- **script.js**: Update the photo gallery with your own images

### 2. Add Photos

1. Add photos to the `photos/` directory
2. The website will automatically detect images with the following naming patterns:
   - `photo1.jpg`, `photo2.jpg`, etc.
   - Simple numbers like `1.jpg`, `2.jpg`, etc.
3. Alternatively and preferably, edit `photos/photos.json` to list all your photos
4. Supported file formats: .jpg, .jpeg, .png, .gif

### 3. Customize Timeline

1. Edit the `timeline.json` file to add or modify life events
2. Keep events in chronological order for the best presentation
3. See `README-timeline.txt` for detailed instructions and formatting

### 4. GitHub Pages Deployment

To deploy this site to GitHub Pages:

1. Create a new GitHub repository
2. Upload all the files to your repository
3. Go to the repository settings
4. Scroll down to the GitHub Pages section
5. Select the main branch as the source
6. Click Save

Your site will be published at `https://yourusername.github.io/repository-name/`

### 5. QR Code

The QR code will automatically be generated based on the URL of your deployed site. You can download it directly from the website once it's live.

## Customization Options

### Using the Noka Font

This website is configured to use the Noka font. To properly set it up:

1. Obtain the Noka font files (Noka.woff, Noka.woff2, and optionally Noka.ttf)
2. Place these files in the `fonts/` directory
3. The website will automatically use Noka for all text
4. If the Noka font files are not available, the website will fall back to the specified backup fonts

### Colors

You can change the color scheme by editing the CSS variables at the top of `styles.css`:

```css
:root {
  --primary-color: #0e2b4a;
  --accent-color: #4a86e8;
  --light-accent: #6ba1ee;
  /* other colors... */
}
```

### Timeline Events

Edit the timeline events in `index.html` by modifying the `timeline-item` sections:

```html
<div class="timeline-item">
  <div class="timeline-date">Date</div>
  <div class="timeline-content">
    <h3>Event Title</h3>
    <p>Event description</p>
  </div>
</div>
```

### Special Places

Customize the special places section by editing the `place-card` elements in `index.html`:

```html
<div class="place-card">
  <div class="place-icon">
    <i class="fas fa-icon-name"></i>
  </div>
  <h3>Place Name</h3>
  <p>Place description</p>
</div>
```

## Browser Compatibility

This website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is made with love in memory of Vudimudi Augusteen Rao and Vudimudi Deena Suseela Rani.
