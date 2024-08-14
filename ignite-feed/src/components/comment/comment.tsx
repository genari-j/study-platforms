import { formatDate } from '~/utils'
import { CommentProps } from '~/types'

import { Avatar } from '~/components'
import { DelCommentModal } from './components'

import { SlLike } from 'react-icons/sl'
import { FaTrash } from 'react-icons/fa'

import styles from './comment.module.css'
import { useState } from 'react'

export const Comment = ({ author, created_at, content, handleDeleteComment }: CommentProps) => {
  const [likeComment, setLikeComment] = useState(0)
  const [delCommentModal, setDelCommentModal] = useState(false)

  const handleLikeComment = () => {
    setLikeComment((state) => state + 1)
  }

  return (
    <div className={styles.container}>
      <Avatar
        hasBorder={false}
        src={author?.avatar}
        alt={`Avatar de ${author?.name}`}
        title={`Avatar de ${author?.name}`}
      />

      <div className={styles.content}>
        <div>
          <header>
            <div>
              <span>{author?.name}</span>
              {created_at &&
                <time
                  title={formatDate(new Date(created_at)).publishedDateFormatted}
                  dateTime={formatDate(new Date(created_at)).isoString}
                >
                  {formatDate(new Date(created_at)).publishedRelativeToNow}
                </time>
              }
            </div>

            {delCommentModal && (
              <DelCommentModal
                delCommentModal={delCommentModal}
                setDelCommentModal={setDelCommentModal}
                handleDeleteComment={handleDeleteComment}
              />
            )}

            <button
              type='button'
              title='Deletar comentário'
              onClick={() => setDelCommentModal(!delCommentModal)}
            >
              <FaTrash />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <button
          type='button'
          onClick={handleLikeComment}
        >
          <i><SlLike /></i> Aplaudir • {likeComment}
        </button>
      </div>
    </div>
  )
}