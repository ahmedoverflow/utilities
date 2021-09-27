import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Speed coding things i need</h1>

      <a href="/facebook-comment-winner">Facebook Comment Winner</a>
    </div>
  );
}
