import { Haptics, ImpactStyle } from '@capacitor/haptics'

export default function haptics(){
  const vibrate = async () => {
    await Haptics.impact({style: ImpactStyle.light})
  }
  
  return {
    vibrate
  }
}