import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const formatDate = (date: Date) => {
  const publishedDateFormatted = format(
    date,
    "dd 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
    { locale: ptBR}
  )

  const publishedRelativeToNow = formatDistanceToNow(
    date,
    { locale: ptBR, addSuffix: true }
  )

  const isoString = date.toISOString()

  return {
    publishedDateFormatted,
    publishedRelativeToNow,
    isoString
  }
}