import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.links}>
        <Link className={styles.link} href={"/titles/mbdb"}>
          Mbdb Movies
        </Link>
        <Link className={styles.link} href={"/titles/tmdb"}>
          Tmdb Movies
        </Link>
      </div>
    </main>
  )
}
