# Musician Portfolio Website

A modern, responsive musician portfolio website built with pure HTML, CSS, and JavaScript.

## Features

- 🎵 **Modern Design**: Clean and elegant interface design inspired by professional musician websites
- 📱 **Responsive Layout**: Perfect adaptation for desktop, tablet, and mobile devices
- 🎼 **Music Player**: Built-in audio player with playlist support and progress control
- 🎨 **Work Showcase**: Categorized display of different types of musical works
- 📧 **Contact Form**: Fully functional contact form with validation
- ✨ **Animations**: Smooth scroll animations and interactive effects
- 🚀 **Performance Optimized**: Lazy loading, debouncing, throttling, and other performance optimization techniques

## File Structure

```
profolio-example/
├── index.html          # Main page file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── audio/              # Audio files folder
│   ├── track1.mp3      # Sample audio files
│   ├── track2.mp3
│   └── track3.mp3
├── package.json        # Project configuration
└── README.md           # Documentation
```

## Usage

1. **Direct Preview**: Double-click `index.html` to open in browser
2. **Local Server**: Run `npm run serve` to start a local server
3. **Development Server**: Run `npm run dev` for live reload development
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Customization Guide

### 1. Modify Personal Information

Find and modify the following sections in `index.html`:

```html
<!-- Modify name -->
<h1 class="hero-title">Musician Name</h1>
<p class="hero-subtitle">Composer | Performer | Music Creator</p>

<!-- Modify contact information -->
<p>musician@example.com</p>
<p>+1 (555) 123-4567</p>
<p>New York, NY, USA</p>
```

### 2. Add Musical Works

1. Place audio files in the `audio/` folder
2. Modify the `tracks` array in `script.js`:

```javascript
let tracks = [
    {
        title: "Your Work Title",
        artist: "Performer Name",
        src: "audio/your-track.mp3"
    }
    // Add more works...
];
```

3. Update the playlist in HTML:

```html
<div class="playlist-item" data-src="audio/your-track.mp3">
    <div class="track-number">01</div>
    <div class="track-info">
        <h5>Your Work Title</h5>
        <p>Performer: Performer Name</p>
    </div>
    <div class="track-duration">3:45</div>
</div>
```

### 3. Modify Color Theme

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Primary color */
    --secondary-color: #3498db;    /* Secondary color */
    --accent-color: #e74c3c;       /* Accent color */
    --text-color: #333;            /* Text color */
    /* Modify other colors... */
}
```

### 4. Add Real Images

1. Create an `images/` folder
2. Replace `image-placeholder` divs in HTML:

```html
<!-- Replace placeholder -->
<div class="image-placeholder">
    <i class="fas fa-music"></i>
</div>

<!-- With real image -->
<img src="images/your-photo.jpg" alt="Description">
```

### 5. Modify Work Categories

Modify filter buttons and work items in HTML:

```html
<!-- Add new filter category -->
<button class="filter-btn" data-filter="electronic">Electronic</button>

<!-- Add corresponding category to work items -->
<div class="work-item" data-category="electronic">
    <!-- Work content -->
</div>
```

## Technical Features

- **Pure Frontend**: No backend server required, can be deployed to static hosting services
- **Modern CSS**: Uses CSS Grid, Flexbox, and CSS variables
- **ES6+**: Uses modern JavaScript syntax and APIs
- **No Dependencies**: Except for font and icon libraries, no other external dependencies
- **SEO Friendly**: Semantic HTML structure

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment Suggestions

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

### Netlify
1. Drag and drop folder to Netlify deploy page
2. Or connect GitHub repository for automatic deployment

### Vercel
1. Use Vercel CLI: `vercel --prod`
2. Or connect GitHub repository

## Installation & Development

```bash
# Clone the repository
git clone https://github.com/username/musician-portfolio.git

# Navigate to project directory
cd musician-portfolio

# Install development dependencies (optional)
npm install

# Start development server
npm run dev

# Or start simple server
npm run serve
```

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Debouncing**: Optimized scroll event handling
- **Throttling**: Smooth performance during interactions
- **Preloading**: Critical resources are preloaded
- **Efficient DOM**: Minimal DOM manipulation

## Accessibility

- **Keyboard Navigation**: Full keyboard support for music player
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **High Contrast**: Good color contrast ratios
- **Responsive Text**: Scalable font sizes

## License

MIT License - Free to use, modify, and distribute

## Support

If you have questions or suggestions, please create an issue or contact the developer.

---

Enjoy creating your professional musician portfolio website! 🎵