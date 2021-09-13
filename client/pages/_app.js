import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { useState, useEffect } from 'react'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(true)
		console.log('loaded')
	}, [loaded])

	return (
		loaded && (
			<>
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
					/>
					<meta name="description" content="Description" />
					<meta name="keywords" content="Keywords" />
					<title>Travel</title>

					<link rel="favicon" href="/icon-192x192.png" />
					<link rel="manifest" href="/manifest.json" />
					<link href="/icon-192x192.png" rel="icon" type="image/png" sizes="16x16" />
					<link href="/icon-192x192.png" rel="icon" type="image/png" sizes="32x32" />
					<link rel="apple-touch-icon" href="/icon-192x192.png"></link>
					<meta name="theme-color" content="#006994" />
				</Head>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</>
		)
	)
}

export default MyApp
