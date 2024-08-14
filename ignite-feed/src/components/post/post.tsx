import { FormEvent, useState } from 'react'

import { PostProps, CommentToDelete } from '~/types'
import { formatDate } from '~/utils'
import { toast } from 'react-hot-toast'

import { Avatar, Comment } from '~/components'

import styles from './post.module.css'

export const Post = ({ author, content, created_at, link }: PostProps) => {
  const [userComments, setUserComments] = useState([
    {
      id: 1,
      author: {
        avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png',
        name: 'João Genari'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex magnam corporis, ipsa delectus, dolore magni ea quidem reiciendis consectetur iure similique blanditiis hic maxime, mollitia expedita neque! Corporis, expedita sequi?',
      created_at: new Date('2024-06-10 07:02:44')
    },
    ,
    {
      id: 2,
      author: {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdEIHFFmRYGju6IHXUHwdwc5qUYWwQdxgZkMGuD86HimHiWDVN4c2ntA7Zjhh9SnwvRM&usqp=CAU',
        name: 'Lucas Genari'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex magnam corporis, ipsa delectus, dolore magni ea quidem reiciendis consectetur iure similique blanditiis hic maxime, mollitia expedita neque! Corporis, expedita sequi?',
      created_at: new Date('2024-06-05 16:14:55')
    },
    {
      id: 3,
      author: {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU',
        name: 'Karoline Genari'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex magnam corporis, ipsa delectus, dolore magni ea quidem reiciendis consectetur iure similique blanditiis hic maxime, mollitia expedita neque! Corporis, expedita sequi?',
      created_at: new Date('2023-08-02 09:11:00')
    },
    {
      id: 4,
      author: {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmIZgikLeLmQQRj2HakAtPWJs4t9FEWIGTflj0lI1eA6VWXs1fCvFUC7V4rc8D2CVPJI&usqp=CAU',
        name: 'João Genari'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex magnam corporis, ipsa delectus, dolore magni ea quidem reiciendis consectetur iure similique blanditiis hic maxime, mollitia expedita neque! Corporis, expedita sequi?',
      created_at: new Date('2022-03-07 19:17:14')
    },
    {
      id: 5,
      author: {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMG4M--Urn_vCg7DyIzJaxEVMcSIPYaqsyzF1lT61zve7acoeOYZjRha4affGpH2u7nNQ&usqp=CAU',
        name: 'Irene Genari'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex magnam corporis, ipsa delectus, dolore magni ea quidem reiciendis consectetur iure similique blanditiis hic maxime, mollitia expedita neque! Corporis, expedita sequi?',
      created_at: new Date('2019-01-19 15:18:54')
    },
  ])
  const [textAreaContent, setTextAreaContent] = useState('')

  const handleAddNewComment = (event: FormEvent) => {
    event?.preventDefault()

    const lastComment = userComments.slice(-1)[0]
    const newId = (lastComment?.id ?? 0) + 1

    const payload = {
      id: newId,
      author: {
        avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png',
        name: 'João Genari'
      },
      content: textAreaContent,
      created_at: new Date()
    }

    userComments.push(payload)
    setTextAreaContent('')

    toast.success('Comentário realizado.')
  }

  const handleDeleteComment = (commentToDelete: CommentToDelete) => {
    const result = userComments.filter(comment => comment !== commentToDelete)
    setUserComments(result)
    toast.success('Comentário deletado.')
  }

  const newCommentEmpty = textAreaContent.length === 0

  return (
    <article className={styles.container}>
      <div className={styles.postHeader}>
        <div className={styles.userInfos}>
          <Avatar
            src={author.avatar}
            alt={`Avatar de ${author.name}`}
            title={`Avatar de ${author.name}`}
          />

          <div>
            <span>{author.name}</span>
            <p>{author.ocupation}</p>
          </div>
        </div>

        {created_at &&
          <time
            title={formatDate(new Date(created_at)).publishedDateFormatted}
            dateTime={formatDate(new Date(created_at)).isoString}
          >
            {formatDate(new Date(created_at)).publishedRelativeToNow}
          </time>
        }
      </div>

      <div className={styles.postDescriptions}>
        <p>{content}</p>
        <p><a href="#" target="_blank" rel="noopener noreferrer">{link}</a></p>

        <div>
          <a href="#" target="_blank" rel="noopener noreferrer">#hashOne</a>
          <a href="#" target="_blank" rel="noopener noreferrer">#hashTwo</a>
          <a href="#" target="_blank" rel="noopener noreferrer">#hashThree</a>
        </div>
      </div>

      <form className={styles.commentForm} onSubmit={handleAddNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          value={textAreaContent}
          onChange={(event) => setTextAreaContent(event.target.value)}
        />

        <div>
          <button
            type='submit'
            disabled={newCommentEmpty}
          >
            Comentar
          </button>
        </div>
      </form>

      {userComments.map((comment) => {
        return (
          <Comment
            key={comment?.id}
            author={comment?.author}
            created_at={comment?.created_at}
            content={comment?.content}
            handleDeleteComment={() => handleDeleteComment(comment)}
          />
        )
      })}
    </article>
  )
}