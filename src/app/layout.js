import './globals.css'
import './app.css'
import './tooltip.css'
import './reactSlider.css'
import 'react-toastify/dist/ReactToastify.css'
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ReduxProvider from '@/redux/ReduxProvider'
import AppContainer from '@/components/AppContainer'
import NextAuthContext from '../lib/nextauth/NextAuthContext'

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;

export const metadata = {
  // meta tags
  title: 'React4Movies',
  description: 'Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.',
  // pwa
  applicationName: 'React4Movies',
  appleWebApp: {
    capable: true,
    title: "React4Movies",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#e9f1fa",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" },
    { rel: "shortcut icon", url: "/favicon.ico" },
  ],
  keywords: ["react4movies", "movies", "mbdb", "tmbd"],

  // og meta tags
  openGraph: {
    title: 'React4Movies',
    description: 'Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.',
    url: process.env.NEXTAUTH_URL,
    siteName: "React4Movies",
    images: [
      {
        url: '/images/website-ss-256x256.jpg',
        width: 185,
        height: 278,
      },
      {
        url: '/images/website-ss-256x256.jpg',
        width: 342,
        height: 513,
      },
      {
        url: '/images/website-ss.jpg',
        width: 500,
        height: 750,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  // twitter og meta tags
  twitter: {
    card: "summary_large_image",
    title: 'React4Movies',
    description: 'Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.',
    images: [
      '/images/website-ss-256x256.jpg',
    ],
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NextAuthContext >
            <AppContainer >
              {children}
            </AppContainer>
          </NextAuthContext>
        </ReduxProvider>
      </body>
    </html>
  )
}
