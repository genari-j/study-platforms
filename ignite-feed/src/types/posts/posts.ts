export interface PostProps {
  id?: number
  author: {
    avatar: string
    name: string
    ocupation: string
  }
  content: string
  link: string
  created_at: Date
}