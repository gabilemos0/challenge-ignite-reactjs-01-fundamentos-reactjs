import styles from './Empty.module.css'

import { ClipboardText } from "phosphor-react";

export function Empty() {
  return (
    <div className={styles.empty}>
      <ClipboardText size={80} weight="thin" color='#333333' />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}