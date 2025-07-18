# AntBros Photography - Image & Content Management Guide

## 🎯 Quick Start: How to Update Your Website

### 1. **Change Images**
Your website currently uses stock photos. Here's how to replace them with your own:

**Option A: Direct File Replacement**
1. Upload your images to `client/public/images/` folder
2. Edit these files to change image URLs:
   - Hero background: `client/src/components/hero.tsx` (line 23)
   - Portfolio images: `client/src/components/portfolio.tsx` (lines 6, 11, 16, 21, 26, 31)
   - About section: `client/src/components/about.tsx` (line 31)

**Option B: Use Admin Panel**
1. Go to `/admin` in your browser
2. Click "Images" tab
3. Upload your photos
4. Update image URLs in the Portfolio and Content sections

### 2. **Update Content**
**Text Content:**
- Visit `/admin` in your browser
- Click "Content" tab
- Edit hero text, about section, contact info
- Click "Save All Changes"

**Portfolio:**
- Visit `/admin` → "Portfolio" tab
- Edit existing items or add new ones
- Upload your own project photos
- Add descriptions and categories

### 3. **View Bookings**
- Visit `/admin` → "Bookings" tab
- See all customer booking requests
- View contact details and service requests

## 📸 Image Specifications

**Recommended Sizes:**
- Hero background: 1920x1080px (landscape)
- Portfolio images: 800x600px (4:3 ratio)
- About section: 800x600px (4:3 ratio)

**Best Practices:**
- Use high-quality images (but keep under 2MB per file)
- Use descriptive filenames (e.g., "studio-setup.jpg")
- Optimize for web (JPG for photos, PNG for graphics)
- Maintain consistent style and color grading

## 🔧 Adding New Functionality

### Popular Features to Add:
1. **Image Gallery with Lightbox**
2. **Client Login Portal**
3. **Online Payment Integration**
4. **Calendar Booking System**
5. **Blog/News Section**
6. **Social Media Integration**
7. **SEO Optimization**
8. **Analytics Dashboard**

### Technical Implementation:
Each feature would involve:
- Frontend components (React/TypeScript)
- Backend API endpoints (Express)
- Database schema updates (if needed)
- UI/UX design integration

## 🚀 Next Steps

1. **Replace stock images** with your photography
2. **Update text content** with your studio information
3. **Test booking form** functionality
4. **Add social media links**
5. **Consider additional features** based on your needs

## 📞 Need Help?

The admin panel at `/admin` provides a user-friendly interface for most common tasks. For advanced customization or new features, technical modifications to the code files would be needed.