import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    console.log('loaded')
  }, [loaded])

  return loaded && (<Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
