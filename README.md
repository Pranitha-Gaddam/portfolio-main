# Portfolio Website

A modern, responsive, and interactive portfolio website built with **Next.js** to showcase projects, experience, and skills.

[🌐 View Live](https://pranithagaddam.site)
<img width="1920" height="985" alt="Portfolio Screenshot Light Mode" src="https://github.com/user-attachments/assets/847bbdce-03d1-4486-84f5-92ab13cb551f" />
<img width="1920" height="985" alt="Portfolio Screenshot Dark Mode" src="https://github.com/user-attachments/assets/dc6432eb-93a4-439d-81e5-00c1870ea8f7" />

---

## Notable Features

- Responsive design + Dark & Light Mode
- Three.js particle background (custom particle system with mouse interaction)
- Contact Form with Email Sending – Secure integration with [Resend](https://resend.com/) API for direct inbox delivery, including spam prevention via honeypot fields.
- Reusable ShadCN UI + Tailwind CSS components for maintainability.
- Performance & SEO Optimized (Fast page loads, semantic HTML, and metadata for better search rankings)

---

## 🛠 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/) animated particle system
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email API:** [Resend](https://resend.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Resend API key (for contact form email functionality)

### Installation
```bash
# Clone the repository
git clone https://github.com/Pranitha-Gaddam/portfolio-main.git

# Navigate to project directory
cd portfolio-main

# Install dependencies
npm install
```
### Environment Variables
Create a .env.local file in the root directory:
```
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=Portfolio <hello@yourdomain.com>
CONTACT_TO=your_email@example.com
```
Run the development server
```npm run dev```
Open https://localhost:3000 in your browser.

### Build for production
```
npm run build
npm start
```

