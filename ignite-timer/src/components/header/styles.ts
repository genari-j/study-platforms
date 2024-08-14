import { styled } from 'styled-components'
import { gray9, green8 } from '~/themes'

export const Container = styled.header`
  display: flex;
  justify-content: center;

  padding: 1.5rem 0;

  background: ${gray9};
`

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;

  display: flex;
  justify-content: space-between;
`

export const Navigation = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 1rem;

    li {
      a {
        display: flex;
        transition: .3s ease;

        padding: 0.5rem;
        border-bottom: 2px solid transparent;

        background: transparent;

        &:hover {
          border-bottom: 2px solid ${green8};
        }
      }
    }

    li:first-child {
      a {
        img {
          width: 1.5rem;
        }
      }
    }

    li:last-child {
      a {
        img {
          width: 1.8rem;
        }
      }
    }
  }
`