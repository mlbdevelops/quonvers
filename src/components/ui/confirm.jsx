import styles from '@/styles/confirm.module.scss';

export default function Confirm({title, msg, actions, nextColor, onClose}){
  
  return(
    <div onClick={onClose} className={styles.blur}>
      <div onClick={(e) => e.stopPropagation()} className={styles.msgBox}>
        <strong style={{
          fontSize: '30px',
          margin: '15px 0 0 0',
          color: '#6a69fe',
          fontWeight: 'bold',
        }}>{title}</strong> 
        
        <span style={{
          margin: '10px 0 15px 0',
          padding: '0 10px',
        }}>{msg}</span>
        
        <div className={styles.buttonsDiv} style={{
          display: 'flex',
        }}>
          {actions.map((btn, i) => (
            <span className={styles.btn}>
              {btn}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}