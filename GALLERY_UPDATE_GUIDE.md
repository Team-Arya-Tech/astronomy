# Rolling Gallery - Image Update Guide

## Overview
A rolling 3D gallery has been successfully added to the "On Ground Research" page (Documentation.js) to display photos from the Jantar Mantar field visit.

## Files Created/Modified

### New Files:
1. **`frontend/src/components/RollingGallery.js`** - Main gallery component
2. **`frontend/src/components/RollingGallery.css`** - Gallery styles

### Modified Files:
1. **`frontend/src/pages/Documentation.js`** - Integrated the RollingGallery component

## How to Update Images

### Step 1: Prepare Your Images
Place your Jantar Mantar photos in the `frontend/public/images/` directory (or any subdirectory within public).

Example structure:
```
frontend/public/images/
  jantar-mantar/
    samrat-yantra-1.jpg
    jai-prakash-1.jpg
    rama-yantra-1.jpg
    misra-yantra-1.jpg
    ... (more images)
```

### Step 2: Update the Images Array
Open **`frontend/src/components/RollingGallery.js`** and locate the `IMGS` array (around line 5):

```javascript
const IMGS = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?...',
  // ... current placeholder images
];
```

Replace it with your local images:

```javascript
const IMGS = [
  '/images/jantar-mantar/samrat-yantra-1.jpg',
  '/images/jantar-mantar/jai-prakash-1.jpg',
  '/images/jantar-mantar/rama-yantra-1.jpg',
  '/images/jantar-mantar/misra-yantra-1.jpg',
  '/images/jantar-mantar/shadow-pattern-1.jpg',
  '/images/jantar-mantar/instrument-detail-1.jpg',
  '/images/jantar-mantar/architectural-view-1.jpg',
  '/images/jantar-mantar/scale-markings-1.jpg',
  '/images/jantar-mantar/celestial-view-1.jpg',
  '/images/jantar-mantar/historical-plaque-1.jpg',
  // Add as many images as you want!
];
```

### Step 3: Alternative - Pass Images as Props
You can also pass custom images directly when using the component in Documentation.js:

```javascript
// In Documentation.js
const jantarMantarImages = [
  '/images/jantar-mantar/photo1.jpg',
  '/images/jantar-mantar/photo2.jpg',
  // ... more images
];

// Then in the JSX:
<RollingGallery 
  autoplay={true} 
  pauseOnHover={true} 
  images={jantarMantarImages}
/>
```

## Component Features

### Current Configuration
- **Autoplay**: Enabled (rotates automatically every 2 seconds)
- **Pause on Hover**: Enabled (stops rotation when mouse hovers)
- **Drag to Rotate**: Users can drag left/right to manually rotate the gallery
- **Responsive**: Adapts to mobile and desktop screen sizes

### Customization Options

You can customize the gallery behavior in `Documentation.js`:

```javascript
<RollingGallery 
  autoplay={true}           // Set to false to disable auto-rotation
  pauseOnHover={true}       // Set to false to keep rotating on hover
  images={customImages}     // Optional: pass custom image array
/>
```

## Gallery Styling

The gallery uses the following color scheme to match your site:
- Background gradient: `#060010` (dark purple/black)
- Border colors: White borders on images
- Hover effect: 1.05x scale animation

To customize the appearance, edit **`frontend/src/components/RollingGallery.css`**:

### Image Size Customization
```css
.gallery-img {
  height: 120px;    /* Adjust height */
  width: 300px;     /* Adjust width */
  border-radius: 15px;
  border: 3px solid #fff;
}
```

### Mobile Size
```css
@media (max-width: 768px) {
  .gallery-img {
    height: 100px;
    width: 220px;
  }
}
```

## Testing

After updating the images:
1. Save all files
2. Run the development server: `npm run start`
3. Navigate to the "On Ground Research" page
4. The gallery should display your new images
5. Test dragging and hover interactions

## Recommended Image Specifications

- **Format**: JPG or PNG
- **Dimensions**: 1200x800px or similar 3:2 aspect ratio
- **File Size**: Keep under 500KB each for optimal loading
- **Optimization**: Use tools like TinyPNG or ImageOptim to compress

## Number of Images

The gallery works with any number of images (minimum 3 recommended). The more images you add, the more faces the 3D cylinder will have.

## Current Location in Documentation Page

The gallery appears after:
- Research Timeline
- Instruments Documented
- Key Research Findings

And before:
- Impact & Future Work

This placement puts it prominently in the middle of the documentation page where visitors can interactively explore your field research photos.

## Next Steps

1. ✅ Gallery component created
2. ✅ Integrated into Documentation page
3. ⏳ **Waiting for your actual Jantar Mantar photos**
4. ⏳ Update the IMGS array with real photo paths
5. ⏳ Test and verify all images display correctly

---

**Note**: The gallery currently uses placeholder landscape photos from Unsplash. Replace these with your actual Jantar Mantar field research photos following the steps above.
