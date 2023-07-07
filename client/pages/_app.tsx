import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { fetchUsers } from '@/serveces/users'
import { useActions } from '@/hooks/useActions'
import EditModal from '@/components/modals/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  return   (
    <Provider store={store}>
      <Toaster />
      <EditModal/>
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    )
}
