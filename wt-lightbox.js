document.addEventListener('DOMContentLoaded', () => {

    const lightboxGroups = document.querySelectorAll('.wt-lightbox-group');
    let body = document.querySelector('body');
    
    // Step 1: Check if any elements with the .wt-lightbox-group css class exist.
    if (lightboxGroups.length === 0) {
        //console.log("No lightbox groups found. Lightbox script will not be initialized.");
        return; // Exit the script if no groups are found.
    }

    // Step 2: If groups are found, add the lightbox HTML dynamically.
    const lightboxHTML = `
        <div id="wt-lightbox" class="wt-lightbox">
            <span class="wt-lightbox-close" title="Close it"></span>
            <img class="wt-lightbox-image" src="" alt="Full-screen image">
            <span class="wt-lightbox-nav-prev wt-lightbox-nav" title="Previous"></span>
            <span class="wt-lightbox-nav-next wt-lightbox-nav" title="Next"></span>
            <div class="wt-lightbox-description"><span></span></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Step 3: Now that the HTML exists, select the elements and proceed with the logic.
    const lightbox = document.getElementById('wt-lightbox');
    const lightboxImage = document.querySelector('.wt-lightbox-image');
    const closeBtn = document.querySelector('.wt-lightbox-close');
    const prevBtn = document.querySelector('.wt-lightbox-nav-prev');
    const nextBtn = document.querySelector('.wt-lightbox-nav-next');
    const lightboxDescription = document.querySelector('.wt-lightbox-description > span');
    

    let currentImages = []; 
    let currentImageIndex = 0;
    
    let isDragging = false;
    let startX = 0;

    let popupEffe = () => {
      setTimeout(()=>{
        body.classList.add('wt-lightbox-effe');
      }, 100);
    }

    // DRY
    function updateLightbox(currentImageIndex) {
      const src = currentImages[currentImageIndex].src;
      const alt = currentImages[currentImageIndex].alt;
      lightboxImage.src = src;
      lightboxImage.alt = alt;

      if (currentImages[currentImageIndex].hasAttribute('title')) {
        const title = currentImages[currentImageIndex].title;
        lightboxDescription.textContent = title;
        lightboxDescription.classList.add('hastitle');
      } else {
        lightboxDescription.classList.remove('hastitle');
        lightboxDescription.textContent = '';
      }
      
    }

    // Function to open the lightbox
    const openLightbox = (imageGroup, index) => {
        currentImages = Array.from(imageGroup).map(thumb => thumb.querySelector('img'));
        if (index >= 0 && index < currentImages.length) {
            currentImageIndex = index;
            updateLightbox(currentImageIndex);
            body.classList.add('wt-lightbox-show');
            popupEffe();
        }
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        body.classList.remove('wt-lightbox-show', 'wt-lightbox-effe');
        lightboxImage.setAttribute('style', '');
    };

    const showEffe = () => {
        lightboxImage.style.transition = 'none';
        lightboxImage.style.opacity = '0';
        setTimeout(()=>{
          lightboxImage.style.transition = 'all 300ms ease-out';
          lightboxImage.style.opacity = '1';
        }, 100);  
    }

    // Function to show the next image in the current group
    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateLightbox(currentImageIndex);
        showEffe();
    };

    // Function to show the previous image in the current group
    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        updateLightbox(currentImageIndex);
        showEffe();
    };

    // Close lightbox listeners
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation button listeners
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (body.classList.contains('wt-lightbox-show')) {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Mouse drag start
    lightboxImage.addEventListener('mousedown', (e) => {
        if (e.target === lightboxImage || e.target === lightbox) {
            isDragging = true;
            startX = e.clientX;
            lightboxImage.style.cursor = 'grabbing';
            e.preventDefault(); 
        }
    });

    // Mouse drag move
    lightboxImage.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const deltaX = currentX - startX;
        lightboxImage.style.transform = `translateX(${deltaX}px)`;
    });

    // Mouse drag end
    lightboxImage.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        lightboxImage.style.cursor = 'grab';

        const endX = e.clientX;
        const deltaX = endX - startX;
        
        lightboxImage.style.transform = 'translateX(0)';

        if (deltaX > 50) {
            showPrevImage();
        } else if (deltaX < -50) {
            showNextImage();
        }
    });
    
    // Mouse leave the lightbox area
    lightbox.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImage.style.cursor = 'grab';
            lightboxImage.style.transform = 'translateX(0)';
        }
    });
    
    // Touch swipe navigation
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        if (deltaX > 50) {
            showPrevImage();
        } else if (deltaX < -50) {
            showNextImage();
        }
    });

    // Initialize a lightbox for each group found on the page
    lightboxGroups.forEach(group => {
        const thumbnails = group.querySelectorAll('.wt-lightbox-item');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                openLightbox(thumbnails, index);
            });
        });
    });
});