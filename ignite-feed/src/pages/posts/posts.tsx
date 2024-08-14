import { userPosts } from '~/utils'
import { Avatar, Post } from '~/components'

import { RiEdit2Fill } from 'react-icons/ri'
import styles from './posts.module.css'

export const Posts = () => {
  return (
    <main className={styles.container}>
      <section className={styles.content}>

        <aside className={styles.sidebar}>
          <img
            src="https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=100&w=350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Profile BG"
            title="User Profile BG"
          />

          <div>
            <Avatar
              src='https://github.com/victorgenari.png'
              alt='User Avatar'
              title='User Avatar'
            />

            <strong>João Genari</strong>
            <span>Fullstack Developer</span>
          </div>

          <a href="#"> <i><RiEdit2Fill /></i> Editar seu perfil </a>
        </aside>

        <div className={styles.posts}>
          {userPosts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                link={post.link}
                created_at={post.created_at}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}