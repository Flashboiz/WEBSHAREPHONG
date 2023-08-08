'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/1.png" 
      height="500" 
      width="200" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
