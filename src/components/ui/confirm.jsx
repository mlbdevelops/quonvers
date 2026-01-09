import styles from '@/styles/confirm.module.scss';

export default function Confirm({title, msg, actions, nextColor, onCancel, onSubmit, onClose, cancel_button_text, submit_button_text, cancel}){
  
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
          padding: '0 15px',
        }}>{msg}</span>
        
        <div className='w-full flex items-center justify-between border-0 border-t-2 border-[#262626]' style={{
          display: 'flex',
        }}>
          {cancel? <button onClick={() => {
            typeof onCancel == 'function' && onCancel()
          }} className='w-[50%] h-13 border-0 border-r-1 border-[#262626] active:bg-[#262626] font-bold'>
            {cancel_button_text && cancel? cancel_button_text : 'Cancel'}
          </button> : null}
          <button onClick={() => {
            typeof onSubmit == 'function' && onSubmit()
          }} className={`${cancel? 'w-[50%]' : 'w-full'} h-13 border-0 ${cancel? 'border-l-1' : ''} border-[#262626] active:bg-[#262626] text-[#6a69fe] font-bold`}>
            {submit_button_text? submit_button_text : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
}