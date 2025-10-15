# Visual Guide: Image Carousel on Learn Page

## What You'll See

### Rama Yantra with Image Carousel

```
┌─────────────────────────────────────────────────┐
│                                                 │
│            [Rama Yantra Image 1]                │
│                                                 │
│  [<]                                       [>]  │ ← Arrow Buttons
│                                                 │
│                                         [1 / 2] │ ← Image Counter
│                    • ○                          │ ← Indicator Dots
└─────────────────────────────────────────────────┘
```

### Features

#### 1. **Left/Right Navigation Arrows**
   - Click the **`<`** button to go to previous image
   - Click the **`>`** button to go to next image
   - Semi-transparent black buttons appear on hover
   - Positioned at the vertical center

#### 2. **Image Counter Badge**
   - Shows current position: "1 / 2", "2 / 2", etc.
   - Located at bottom-right corner
   - Dark semi-transparent background

#### 3. **Indicator Dots**
   - Shows all available images
   - Gold (•) = Current image
   - Gray (○) = Other images
   - Click any dot to jump to that image
   - Located at bottom-center

#### 4. **Touch/Swipe Gestures** (Mobile)
   - **Swipe Left** → Next image
   - **Swipe Right** → Previous image
   - Works on any touch-enabled device

## User Interaction Flow

### Desktop Users
1. Hover over image to see navigation buttons
2. Click left/right arrows to navigate
3. OR click indicator dots for direct navigation
4. Image smoothly transitions to next/previous

### Mobile Users
1. Swipe left on image to see next image
2. Swipe right on image to see previous image
3. OR tap indicator dots for direct navigation
4. Smooth animation between images

## Current Implementation

### Yantras with Multiple Images
- ✅ **Samrat Yantra** (1 image) - No carousel
- ✅ **Rama Yantra** (2 images) - Carousel enabled
  - Image 1: rama-yantra-1.jpg
  - Image 2: rama-yantra-2.jpg

### Yantras Ready for Multiple Images
You can easily add multiple images to any other yantra by:
1. Adding image files to `frontend/public/images/`
2. Updating the yantra object with an `images` array

## Technical Implementation

### Carousel Logic
- **Loop Navigation**: Last image → First image (and vice versa)
- **State Management**: React useState tracks current image
- **Conditional Rendering**: Carousel only shows for multi-image yantras
- **Performance**: Lazy loading with error fallbacks

### Touch Detection
- Minimum swipe distance: 50 pixels
- Direction detection: Left vs Right
- Prevents accidental swipes
- Works with native mobile gestures

## Browser Testing

### Desktop Browsers
- Chrome ✅
- Firefox ✅
- Edge ✅
- Safari ✅

### Mobile Browsers
- Chrome Mobile ✅
- Safari iOS ✅
- Firefox Mobile ✅
- Samsung Internet ✅

## Accessibility Features

- **Keyboard Navigation**: Tab + Enter on buttons
- **Alt Text**: All images have descriptive alt text
- **High Contrast**: Visible controls on all backgrounds
- **Screen Readers**: Proper ARIA labels (via MUI)

## Animation Details

- Smooth fade/slide transitions
- 300ms transition duration
- Hardware-accelerated CSS transforms
- No janky animations

## Example Usage Scenario

1. User visits Learn page
2. Clicks on "Rama Yantra" tab
3. Sees first image with carousel controls
4. Swipes left or clicks right arrow
5. Second image smoothly appears
6. Indicator dots update to show position
7. Can swipe/click back to first image
8. Loop continues infinitely

## Troubleshooting

### If images don't appear:
1. Check files exist in `frontend/public/images/`
2. Verify file names match exactly (case-sensitive)
3. Check browser console for 404 errors
4. Clear browser cache and reload

### If carousel doesn't appear:
1. Verify yantra has `images` array defined
2. Check array has more than 1 image
3. Inspect React state in DevTools
4. Verify no JavaScript errors in console

## Future Enhancements (Optional)

Potential improvements you could add:
- [ ] Autoplay carousel with timer
- [ ] Zoom functionality on image click
- [ ] Thumbnail preview strip
- [ ] Image captions/descriptions
- [ ] Full-screen lightbox mode
- [ ] Keyboard arrow key navigation
- [ ] Drag-to-swipe on desktop
- [ ] Animation presets (fade, slide, flip)

## File Structure

```
frontend/
├── public/
│   └── images/
│       ├── samrat-yantra.jpg      ← Added ✅
│       ├── rama-yantra-1.jpg      ← Added ✅
│       ├── rama-yantra-2.jpg      ← Added ✅
│       └── README.md
└── src/
    └── pages/
        └── Learn.js               ← Updated ✅
```

## Code Highlights

### Smart Image Selection
```javascript
const getCurrentImage = () => {
  if (currentYantra.images && currentYantra.images.length > 0) {
    return currentYantra.images[activeImageStep];
  }
  return currentYantra.image; // Fallback
};
```

### Touch Gesture Detection
```javascript
const onTouchEnd = () => {
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  
  if (isLeftSwipe) handleNextImage();
  else if (isRightSwipe) handleBackImage();
};
```

### Loop Navigation
```javascript
const handleNextImage = () => {
  setActiveImageStep((prevStep) => (prevStep + 1) % maxImageSteps);
};
```

This ensures seamless infinite scrolling through images!
