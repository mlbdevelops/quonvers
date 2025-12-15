import { Bell, Menu, Search, User, Globe, Lock, ChevronRight, Edit, Shield, Palette, HelpCircle, LogOut, Users } from 'lucide-react'
import Header from '@/components/elements/header'

export default function SettingsTab(){
  return(
    <div className='h-screen w-full text-center flex items-center flex-col'>
      <Header 
        title='Settings'
      />
      <div className='w-full overflow-scroll flex-1 flex flex-col pb-30 items-center'>
      
        <div className='flex flex-col gap-1 items-center p-5'>
          <div className='w-30 font-bold h-30 text-[#6a69fe] flex justify-center items-center rounded-full mb-3 bg-[rgba(106,105,254,0.125)]'>
            <strong style={{fontSize: 40}}>
              M
            </strong>
          </div>
          <strong style={{fontSize: 23}}>
            Mlb dev
          </strong>
          <small className='text-[darkgray]' style={{fontSize: 15}}>
            loriginalmlb@gmail.com
          </small>
        </div>
        <span className='w-30 pt-1 pb-1 text-[#f0f0f0] border border-1 rounded border-[#262626]'>
          View profile
        </span>
        
        {/*Account*/}
        
        <div className='w-full pt-4 mt-10 items-start flex flex-col border-0 border-t-1 border-[#121212]'>
          <strong className='font-bold ml-4 text-[#8e8e8e]'>
            Account
          </strong>
          
          <div className='w-full pt-2 flex flex-col items-center'>
          
            {/*Edit profile*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <Edit/>
                <span>
                  Edit profile
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
            
            {/*Privacy settings*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <Shield/>
                <span>
                  Privacy settings
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
            
            {/*Security*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <Lock/>
                <span>
                  Security
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
            
          </div>
        </div>
        
        {/*Preference*/}
        
        <div className='w-full pt-4 mt-5 items-start flex flex-col border-0 border-t-1 border-[#121212]'>
          <strong className='font-bold ml-4 text-[#8e8e8e]'>
            Preference
          </strong>
          
          <div className='w-full pt-2 flex flex-col items-center'>
          
            {/*Theme*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <Palette/>
                <span>
                  Appearance
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
            
            {/*Notifications*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <Bell/>
                <span>
                  Notifications
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
          </div>
        </div>
        
        {/*Support*/}
        
        <div className='w-full pt-4 mt-5 items-start flex flex-col border-0 border-t-1 border-[#121212]'>
          <strong className='font-bold ml-4 text-[#8e8e8e]'>
            Help
          </strong>
          <div className='w-full pt-2 flex flex-col items-center'>
          
            {/*Help*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-3'>
                <HelpCircle/>
                <span>
                  Help center
                </span>
              </div>
              <ChevronRight size={15}/>
            </div>
            
          </div>
        </div>
        
        {/*Login*/}
        
        <div className='w-full pt-4 mt-5 items-start flex flex-col border-0 border-t-1 border-[#121212]'>
          <strong className='font-bold ml-4 text-[#8e8e8e]'>
            Help
          </strong>
          <div className='w-full pt-2 flex flex-col items-center'>
          
            {/*Logout*/}
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-2 text-[#6a69fe]'>
                <Users/>
                <span>
                  Log into another account
                </span>
              </div>
            </div>
            
            <div className='flex items-center justify-between w-[99%] active:bg-[#161616] p-3 gap-2'>
              <div className='flex gap-2 text-[#ff3b3b]'>
                <LogOut/>
                <span>
                  Log out
                </span>
              </div>
            </div>
            
          </div>
          
        </div>
        <span className='text-[#868686] mt-5'>
          version 1.0.0
        </span>
      </div>
    </div>
  );
}