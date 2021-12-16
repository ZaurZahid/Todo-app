import Head from 'next/head'
import '../styles/global.css'
import { Provider } from 'react-redux';
import store from './../src/redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title> Table of Todo items </title>
        <meta name="description" content={'Table of Todo items'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={'Table of Todo items'} />
        <meta property="og:description" content={'Table of Todo items'} />
        <meta property="og:site_name" content={'Table of Todo items'} />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
