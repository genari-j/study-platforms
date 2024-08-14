export interface CommentProps {
  id?: number
  author: {
    avatar: string
    name: string
  } | undefined
  content: string | undefined
  created_at: Date | undefined
  handleDeleteComment?: () => void
}

export type CommentToDelete = {
  id: number
  author: {
    avatar: string
    name: string
  }
  content: string
  created_at: Date
} | undefined