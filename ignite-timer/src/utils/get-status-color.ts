import { green8, red9, yellow9 } from '~/themes'

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluída': return green8;
    case 'Interrompida': return red9;
    case 'Em andamento': return yellow9;
    default: return yellow9;
  }
}