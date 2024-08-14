import { styled } from 'styled-components'
import { gray8, green8, white9, green9, red8, red9 } from '~/themes'

export const Container = styled.main`
  width: 100%;

  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;

  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    fieldset {
      width: 100%;

      display: flex;
      justify-content: center;
      gap: 0.8rem;

      padding: 2rem;
      border-radius: 0.5rem;

      border: 2px solid ${gray8};

      input {
        padding: 0 0 0 0.3rem;
        border-bottom: 2px solid ${gray8};
        color: ${white9};
        background: transparent;
      }
      input[type='number'] { width: 2rem; }

      legend { padding: 0 0.5rem; }

      button {
        width: 1.5rem;
        height: 1.5rem;

        display: flex;

        background: transparent;

        img { width: 100%; }
      }
    }

    > div {
      display: flex;
      gap: 1rem;

      span {
        width: 167.38px;

        font-size: 10rem;
        font-weight: 600;
        padding: 2rem;
        border-radius: 0.5rem;

        background: ${gray8};

        &:nth-child(3) {
          width: 108px;
          color: ${green8};
          background: transparent;
        }
      }
    }
  }
`

const BaseCountdownBtn = styled.button`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  transition: .3s ease;

  font-size: 1.2rem;
  font-weight: 500;
  padding: 1rem 0;
  border-radius: 0.5rem;

  color: ${white9};

  img { width: 1.5rem; }
`

export const StartCycle = styled(BaseCountdownBtn)`
  background: ${green8};
  &:hover { background: ${green9}; }
`

export const StopCycle = styled(BaseCountdownBtn)`
  background: ${red9};
  &:hover { background: ${red8}; }
`