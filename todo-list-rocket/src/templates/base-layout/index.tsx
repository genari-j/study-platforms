import { Outlet } from 'react-router-dom'

import { Header, Footer } from '~/components'

import styles from './base.module.css'

export const BaseLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}