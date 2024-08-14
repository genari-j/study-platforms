import { styled } from 'styled-components'
import { gray8, gray9, yellow9 } from '~/themes'

interface StatusProps {
  $statusbg?: string
}

export const Container = styled.main`
  width: 100%;

  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TableBox = styled.div`
  width: 100%;
  /* height: 500px; */

  overflow: hidden;
  /* overflow-y: scroll; */

  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0 ${gray8};

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          text-align: start;
          padding: 1rem;

          background: ${gray9};
        }
      }
    }

    tbody {
      tr {
        &:nth-child(even) { background: ${gray8}; }

        td {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          &:first-child { width: 50%; }
        }
      }
    }
  }
`

export const TableStatus = styled.td<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ $statusbg }) => $statusbg || yellow9};
  }
`