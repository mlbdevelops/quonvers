'use client'
export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation'

export default function query(){
  //const router = useRouter();
  const searchParams = useParams();
  
  return(
    <div>
      {searchParams.query}
    </div>
  );
}
