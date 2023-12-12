import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import makeStore from '@/store/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
   
  )
}

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);

