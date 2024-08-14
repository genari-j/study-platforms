import { ComponentProps } from 'react'

import styles from './avatar.module.css'

interface AvatarProps extends ComponentProps<'img'> {
  hasBorder?: boolean
}

export const Avatar = ({ hasBorder = true, ...rest }: AvatarProps) => {
  return (
    <img
      className={hasBorder ? styles.avatar : styles.avatarWithoutBorder}
      {...rest}
    />
  )
}
