import './globals.css';
import { Inter, Playfair_Display, Bad_Script, Playfair_Display_SC } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});
const badScript = Bad_Script({
    subsets: ["latin"],
  weight: "400",
  variable: "--font-bad-script",
  display: "swap",
  });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata = {
    title: "Pranitha Gaddam Portfolio",
    icons: {
        icon: "/images/icon.png",
      },
  };

const playFairDisplaySC = Playfair_Display_SC({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: '--font-playfair-display-sc',
});
  

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} ${playFairDisplaySC.variable} ${badScript.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Analytics />
            <Footer />
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-4S0Q4FYQ8E" />
      </html>
    );
  }
  
