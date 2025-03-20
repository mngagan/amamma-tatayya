document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations on scroll
    initScrollAnimation();
    
    // Load timeline data
    loadTimelineData();
    
    // Load photo gallery
    loadPhotoGallery();
    
    // Initialize lightbox
    initLightbox();
    
    // Create floating dots
    createFloatingDots();
});

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimation() {
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from viewport bottom
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to observe for scroll animations
    const animatedElements = document.querySelectorAll('.timeline-item, .place-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Load timeline data from timeline.json
 */
function loadTimelineData() {
    const timelineContainer = document.getElementById('timeline');
    if (!timelineContainer) return;
    
    // Fetch the timeline.json file
    fetch('timeline.json')
        .then(response => response.json())
        .then(data => {
            // Clear loading indicator
            timelineContainer.innerHTML = '';
            
            // Process events array
            if (data.events && data.events.length > 0) {
                // Create timeline items
                data.events.forEach((event, index) => {
                    const timelineItem = document.createElement('div');
                    timelineItem.className = 'timeline-item';
                    
                    // Alternate items on left and right
                    if (index % 2 === 0) {
                        timelineItem.classList.add('odd');
                    } else {
                        timelineItem.classList.add('even');
                    }
                    
                    timelineItem.innerHTML = `
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-content">
                            <h3>${event.title}</h3>
                            <p>${event.description}</p>
                        </div>
                    `;
                    
                    timelineContainer.appendChild(timelineItem);
                    
                    // Initialize animations
                    initScrollAnimation();
                });
            } else {
                timelineContainer.innerHTML = `
                    <div class="timeline-loading">
                        <p>No timeline events found.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading timeline data:', error);
            
            // Show error message
            timelineContainer.innerHTML = `
                <div class="timeline-loading">
                    <p>Could not load timeline data. Please check if timeline.json exists.</p>
                </div>
            `;
        });
}

/**
 * Load photos dynamically into the gallery
 */
function loadPhotoGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;
    
    // Clear loading indicator
    galleryContainer.innerHTML = '<div class="gallery-loading"><div class="loading-spinner"></div><p>Loading photos...</p></div>';
    
    // Fetch the photos.json file
    fetch('photos/photos.json')
        .then(response => response.json())
        .then(data => {
            // Clear loading indicator
            galleryContainer.innerHTML = '';
            
            // Process photos array
            if (data.photos && data.photos.length > 0) {
                // Create photo elements
                data.photos.forEach((photo, index) => {
                    createGalleryItem(photo.src, photo.caption || 'Family memory', galleryContainer);
                });
            } else {
                showNoPhotosMessage(galleryContainer);
            }
        })
        .catch(error => {
            console.error('Error loading photos:', error);
            
            // Show directory contents as a fallback
            loadDirectoryContents(galleryContainer);
        });
}

/**
 * Show a message when no photos are found
 * @param {HTMLElement} container - The container to show the message in
 */
function showNoPhotosMessage(container) {
    container.innerHTML = `
        <div class="gallery-loading">
            <p>No photos found. Please add photos to the "photos" directory.</p>
            <p class="gallery-help">Then update the photos.json file to include your photos.</p>
        </div>
    `;
}

/**
 * Fallback function to load photos by checking common patterns
 * @param {HTMLElement} container - The container to add photos to
 */
function loadDirectoryContents(container) {
    container.innerHTML = '<div class="gallery-loading"><p>Scanning directory for photos...</p></div>';
    
    // Get all image files in the directory
    const photos = [];
    
    // List actual files in the directory (this list needs to be updated manually)
    const filesInDirectory = [
        // Add all your image files here, for example:
        // "family1.jpg", 
        // "grandparents.png",
        // etc.
    ];
    
    if (filesInDirectory.length > 0) {
        container.innerHTML = '';
        
        // Create gallery items for each file
        filesInDirectory.forEach(file => {
            if (file.match(/\.(jpe?g|png|gif)$/i)) { // Only include image files
                createGalleryItem(file, file, container);
            }
        });
    } else {
        // If no files are listed, try the original method with common patterns
        tryCommonPhotoPatterns(container);
    }
}

/**
 * Try loading photos with common naming patterns as a last resort
 * @param {HTMLElement} container - The container to add photos to
 */
function tryCommonPhotoPatterns(container) {
    container.innerHTML = '<div class="gallery-loading"><p>Trying common photo patterns...</p></div>';
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const maxImagesToTry = 20; // Maximum number of images to attempt loading
    let loadedCount = 0;
    
    // Try to load images with common patterns
    for (let i = 1; i <= maxImagesToTry; i++) {
        for (const ext of imageExtensions) {
            const fileName = `photo${i}${ext}`;
            
            const testImg = new Image();
            testImg.onload = function() {
                if (loadedCount === 0) {
                    container.innerHTML = ''; // Clear message on first successful load
                }
                createGalleryItem(fileName, 'Family memory', container);
                loadedCount++;
            };
            testImg.onerror = function() {
                // Image doesn't exist, try next option
            };
            testImg.src = `photos/${fileName}`;
        }
        
        // Also try simple numeric names
        for (const ext of imageExtensions) {
            const fileName = `${i}${ext}`;
            
            const testImg = new Image();
            testImg.onload = function() {
                if (loadedCount === 0) {
                    container.innerHTML = ''; // Clear message on first successful load
                }
                createGalleryItem(fileName, 'Family memory', container);
                loadedCount++;
            };
            testImg.onerror = function() {
                // Image doesn't exist, try next option
            };
            testImg.src = `photos/${fileName}`;
        }
    }
    
    // Check if we found any photos after a delay
    setTimeout(() => {
        if (loadedCount === 0) {
            container.innerHTML = `
                <div class="gallery-loading">
                    <p>No photos found. Please add photos to the "photos" directory.</p>
                    <p class="gallery-help">Then create or update photos.json with your photos.</p>
                    <p class="gallery-help">Alternatively, name your photos like "photo1.jpg", "photo2.jpg", etc.</p>
                </div>
            `;
        }
    }, 2000);
}

/**
 * Create a gallery item for a photo
 * @param {string} fileName - The file name of the photo
 * @param {string} caption - The caption for the photo
 * @param {HTMLElement} container - The container to append the gallery item to
 */
function createGalleryItem(fileName, caption, container) {
    const photoElement = document.createElement('div');
    photoElement.className = 'gallery-photo';
    
    const imgElement = document.createElement('img');
    imgElement.src = `photos/${fileName}`;
    imgElement.alt = caption || 'Family memory';
    imgElement.loading = 'lazy'; // Use lazy loading for better performance
    
    const captionElement = document.createElement('div');
    captionElement.className = 'photo-caption';
    captionElement.textContent = caption || 'Family memory'; // Use actual caption instead of filename
    
    photoElement.appendChild(imgElement);
    photoElement.appendChild(captionElement);
    container.appendChild(photoElement);
    
    // Add click event for lightbox
    photoElement.addEventListener('click', () => {
        openLightbox(imgElement.src, caption || 'Family memory');
    });
}

/**
 * Initialize the lightbox functionality
 */
function initLightbox() {
    // Create lightbox element if it doesn't exist
    if (!document.querySelector('.lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const lightboxImage = document.createElement('img');
        lightboxImage.className = 'lightbox-image';
        
        const lightboxCaption = document.createElement('div');
        lightboxCaption.className = 'lightbox-caption';
        
        const lightboxClose = document.createElement('div');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '<i class="fas fa-times"></i>';
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(lightboxCaption);
        lightbox.appendChild(lightboxContent);
        lightbox.appendChild(lightboxClose);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        document.body.appendChild(lightbox);
    }
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

/**
 * Open the lightbox with a specific photo
 * @param {string} imageSrc - The source URL of the image
 * @param {string} caption - The caption for the image
 */
function openLightbox(imageSrc, caption) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Set the image and caption
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    
    // Show the lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
}

/**
 * Close the lightbox
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Create floating dots in the background
 */
function createFloatingDots() {
    const dotsContainer = document.querySelector('.floating-dots');
    if (!dotsContainer) return;
    
    // Clear any existing content
    dotsContainer.innerHTML = '';
    
    // Number of dots to create
    const numberOfDots = 30;
    
    // Create dots
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random size between 2-5px
        const size = Math.floor(Math.random() * 4) + 2;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Generate random animation path points (4 points for a complete cycle)
        const path = [];
        for (let p = 0; p < 4; p++) {
            // Random distance 30-100px
            const distance = Math.floor(Math.random() * 70) + 30;
            // Random angle in radians
            const angle = Math.random() * Math.PI * 2;
            // Convert to x,y coordinates
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            path.push({ x, y });
        }
        
        // Random speed (shorter duration = faster movement)
        const duration = Math.random() * 30 + 15; // 15-45 seconds
        
        // Define keyframes as a string
        const keyframes = `
            @keyframes float${i} {
                0% { transform: translate(0, 0); }
                25% { transform: translate(${path[0].x}px, ${path[0].y}px); }
                50% { transform: translate(${path[1].x}px, ${path[1].y}px); }
                75% { transform: translate(${path[2].x}px, ${path[2].y}px); }
                100% { transform: translate(0, 0); }
            }
        `;
        
        // Create and append style element with keyframes
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        // Style the dot
        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: var(--accent-color);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            opacity: ${Math.random() * 0.3 + 0.2};
            animation: float${i} ${duration}s infinite ease-in-out;
            animation-delay: -${Math.random() * 5}s;
        `;
        
        dotsContainer.appendChild(dot);
    }
} 