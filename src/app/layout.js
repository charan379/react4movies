import './globals.css'
import './app.css'
import './tooltip.css'
import './reactSlider.css'
import 'react-toastify/dist/ReactToastify.css'
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Inter } from 'next/font/google'
import ReduxProvider from '@/redux/ReduxProvider'
import AppContainer from '@/components/AppContainer'
import NextAuthContext from './NextAuthContext'

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // meta tags
  title: 'React4Movies',
  description: 'Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly',

  // og meta tags
  openGraph: {
    title: React4Movies,
    description: 'Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly',
    url: process.env.NEXTAUTH_URL,
    siteName: "React4Movies",
    images: [
      {
        url: data?.poster_path
          ?.toString()
          ?.replace(/(w\d+|original)/g, "w92"),
        width: 92,
        height: 138,
      },
      {
        url: data?.poster_path
          ?.toString()
          ?.replace(/(w\d+|original)/g, "w154"),
        width: 154,
        height: 231,
      },
      {
        url: data?.poster_path
          ?.toString()
          ?.replace(/(w\d+|original)/g, "w185"),
        width: 185,
        height: 278,
      },
      {
        url: data?.poster_path
          ?.toString()
          ?.replace(/(w\d+|original)/g, "w342"),
        width: 342,
        height: 513,
      },
      {
        url: data?.poster_path
          ?.toString()
          ?.replace(/(w\d+|original)/g, "w500"),
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
    title: data?.title,
    description: data?.overview,
    images: [
      data?.poster_path?.toString()?.replace(/(w\d+|original)/g, "w342"),
    ],
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
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
