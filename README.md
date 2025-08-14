# Portfolio Website

A modern, responsive, and interactive portfolio website built with **Next.js** to showcase projects, experience, and skills. Designed for high performance, accessibility, and visual appeal, this site integrates smooth animations, an interactive Three.js particle background, and a contact form to connect with visitors.

[🌐 View Live on Vercel](https://portfolio-main-1s9o6gsfo-pranitha-gaddams-projects.vercel.app)

<img width="1512" height="856" alt="Screenshot 2025-08-14 at 5 28 31 PM" src="https://github.com/user-attachments/assets/cb023650-f940-4e76-aa36-99370c3ab015" /> <!-- optional: add screenshot image -->
<img width="1512" height="861" alt="Screenshot 2025-08-14 at 5 30 02 PM" src="https://github.com/user-attachments/assets/3d7107c6-ec6a-47c3-a99b-b3802acd27e6" />

---

## 🚀 Notable Features

- **🎨 Responsive Design** – Looks great on mobile, tablet, and desktop.
- **🌓 Dark & Light Mode** – Theme toggle for personalized viewing.
- **✨ Three.js Particle Background** – Custom particle system with mouse interaction for an immersive landing page.
- **🎬 Smooth Animations** – Framer Motion transitions for a polished, professional feel.
- **📩 Contact Form with Email Sending** – Secure integration with [Resend](https://resend.com/) API for direct inbox delivery, including spam prevention via honeypot fields.
- **🔗 Social Media Integration** – Quick links to GitHub, LinkedIn, and other profiles.
- **♻️ Modular Components** – Reusable ShadCN UI + Tailwind CSS components for maintainability.
- **⚡ Performance & SEO Optimized** – Fast page loads, semantic HTML, and metadata for better search rankings.

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

