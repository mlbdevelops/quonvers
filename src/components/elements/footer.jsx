import styles from '@/styles/footer.module.scss'

export default function Footer({elems}){
  return(
    <div className={styles.footer}>
      {elems}
    </div>
  )
}