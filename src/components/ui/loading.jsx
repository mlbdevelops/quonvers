import styles from '@/styles/loader.module.scss'

export default function Loader(){
  return(
    <div className={styles.main} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '83%',
      width: '100%',
      top: '60px',
      position: 'fixed',
      borderRadius: '10px',
      backgroundColor: 'transparent',
      zIndex: 99988888888,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        width: '100px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0,0,0,0.9)',
        backDropFilter: 'blur(100px)',
        border: '1px solid #262626'
      }}>
        <div className={styles.load} style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className={styles.loader} style={{
            padding: 10,
            backgroundColor: '#6a69fe',
            borderRadius: 50,
          }}></div>
          <div className={styles.loader} style={{
            backgroundColor: '#6a69fe',
            padding: 10,
            borderRadius: 50,
          }}></div>
        </div>
      </div>
    </div>
  );
}