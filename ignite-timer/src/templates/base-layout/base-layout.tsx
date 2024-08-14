import { Outlet } from 'react-router-dom'

import { Header, Footer } from '~/components'

import { Container } from './styles'

export const BaseLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  )
}