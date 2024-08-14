import { Link } from 'react-router-dom'

import { Logo, Sheet, Timer } from '~/assets'

import { Container, Content, Navigation } from './styles'

export const Header = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt='Logo' title='Logo' />

        <Navigation>
          <ul>
            <li> <Link to='/'> <img src={Timer} alt='Timer' title='Timer' /> </Link> </li>
            <li> <Link to='/timer-history'> <img src={Sheet} alt='Sheet' title='Sheet' /> </Link> </li>
          </ul>
        </Navigation>
      </Content>
    </Container>
  )
}