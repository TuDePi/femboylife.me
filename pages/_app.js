import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FemboyLife</title>
        <link rel="icon" href="/femboy.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
