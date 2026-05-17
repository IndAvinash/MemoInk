// for viewing entry

import { useRouter } from "next/navigation";

export default function View({id}:{id?:string}){
   const router = useRouter();
    if(!id){
        router.push("/write");
    }

    return(<></>)
}