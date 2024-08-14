import { Dispatch, SetStateAction } from 'react'

import styles from './del-comment-modal.module.css'

interface DelCommentModal {
  delCommentModal: boolean
  setDelCommentModal: Dispatch<SetStateAction<boolean>>
  handleDeleteComment?: () => void
}

export const DelCommentModal = ({delCommentModal, setDelCommentModal, handleDeleteComment }: DelCommentModal) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Deletar comentário</h3>
        <p>Tem certeza que deseja deletar o comentário?</p>
        <div>
          <button type='button' onClick={handleDeleteComment}>Sim, deletar</button>
          <button type='button' onClick={() => setDelCommentModal(!delCommentModal)}>Não</button>
        </div>
      </div>
    </div>
  )
}