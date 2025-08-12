import './globals.css';
import { Inter, Playfair_Display, Great_Vibes, Playfair_Display_SC } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

  const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-greatvibes',
  });
  export const playFairDisplaySC = Playfair_Display_SC({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: '--font-playfair-display-sc',
  });
  

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${playFairDisplaySC.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    );
  }
  