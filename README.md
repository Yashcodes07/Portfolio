# Portfolio Website

A modern, dark-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring an animated tech stack slider and integrated blog section.

## ✨ Features

- 🎨 Dark theme with blue/black color scheme
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔗 Social media links in navbar (Gmail, LinkedIn, GitHub, Instagram)
- 📄 Resume download functionality
- 📝 Integrated blog section
- 🎯 Animated infinite tech stack slider
- 🏆 Achievements section
- 💼 Projects showcase
- ⚡ Built with Next.js 14 and TypeScript
- 🎭 Smooth scrolling navigation
- 🎨 Modern UI with hover effects and animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd portfolio-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization Guide

### 1. Personal Information

Edit `/components/Hero.tsx`:
- Line 28: Replace `"Your Name"` with your actual name
- Line 22: Update the profile image path

### 2. Resume PDF

Add your resume PDF to the `/public` directory:
- Name it `resume.pdf` OR
- Update the path in `/components/Hero.tsx` line 12

### 3. Social Media Links

Update these files with your actual social media URLs:
- `/components/Header.tsx`
- `/components/Footer.tsx`

Replace:
- `your.email@gmail.com` with your email
- `yourprofile` with your LinkedIn username
- `yourusername` with your GitHub username
- `yourprofile` with your Instagram username

### 4. Profile Image

Add your profile image to the `/public` directory:
- Name it `profile.jpg` or update the path in `/components/Hero.tsx`
- Recommended size: 800x800px for best quality
- Supported formats: .jpg, .jpeg, .png

### 5. Tech Stack

Edit `/components/TechStack.tsx`:
- Modify the `technologies` array (lines 24-42)
- Add or remove technologies based on your skills
- Icons are from `react-icons/si` (Simple Icons)
- To add more icons, import them from `react-icons/si`

### 6. Achievements

Edit `/components/Achievements.tsx`:
- Update the `achievements` array (lines 6-29)
- Modify titles, descriptions, dates, and icons
- Available icons: FaTrophy, FaCertificate, FaMedal, FaStar (or add more from react-icons/fa)

### 7. Projects

Edit `/components/Projects.tsx`:
- Update the `projects` array (lines 6-41)
- Add project titles, descriptions, technologies, and links
- Optionally add project images to `/public` directory
- Update GitHub and live demo URLs

### 8. Blog Posts

Edit `/components/Blogs.tsx`:
- Update the `blogs` array (lines 6-61)
- Add your actual blog posts with:
  - Title
  - Excerpt/description
  - Date
  - Read time
  - Category
  - Link to full blog post
- Update the "View All Posts" button link if needed

### 9. Color Scheme

To change the color scheme, edit `/tailwind.config.js`:
```javascript
colors: {
  primary: '#0a0e27',      // Main background (dark blue-black)
  secondary: '#1a1f3a',    // Card backgrounds (lighter blue)
  accent: '#3b82f6',       // Blue accent color
  'accent-dark': '#2563eb', // Darker blue
}
```

### 10. Footer

Edit `/components/Footer.tsx`:
- Update "Your Name" in line 42 with your actual name

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── Header.tsx        # Navigation header with social links
│   ├── Hero.tsx          # Hero section with intro & buttons
│   ├── TechStack.tsx     # Animated tech stack slider
│   ├── Achievements.tsx  # Achievements section
│   ├── Projects.tsx      # Projects section
│   ├── Blogs.tsx         # Blog posts section
│   └── Footer.tsx        # Footer
├── public/               # Static assets
│   ├── profile.jpg       # Your profile photo (add this)
│   └── resume.pdf        # Your resume PDF (add this)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🛠️ Building for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify
1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

### Other Platforms
You can deploy to any platform that supports Next.js applications.

## 💡 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library (Font Awesome & Simple Icons)

## 📝 Important Notes

### Resume Button
- Make sure to add your `resume.pdf` file to the `/public` directory
- The button will open the PDF in a new tab
- If you want to use a different filename, update line 12 in `/components/Hero.tsx`

### Blog Section
- The blog posts are currently static data
- To make them dynamic, you can:
  - Connect to a CMS (like Contentful, Sanity)
  - Use markdown files with next-mdx-remote
  - Connect to your blogging platform API
  - Update the links to point to your actual blog posts

### Tech Stack Slider
- The slider uses CSS animation for smooth infinite scrolling
- Technologies are duplicated to create a seamless loop
- To adjust speed, modify the animation duration in `/tailwind.config.js` (line 18)
- Currently set to 40s - lower for faster, higher for slower

## 🎯 Tips

1. **Images**: Optimize your images before adding them to `/public` for better performance
2. **Resume**: Keep your resume PDF under 5MB for faster loading
3. **Colors**: Use contrast checker tools to ensure text readability
4. **Mobile Testing**: Always test on actual mobile devices
5. **Blog Links**: Make sure all blog links point to valid URLs before deploying

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🆘 Support

For issues or questions, please open an issue on GitHub or contact me through the social links in the portfolio.

---

**Happy Coding! 🚀**
