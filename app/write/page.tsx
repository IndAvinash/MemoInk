"use client"
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { AlignCenter, AlignLeft, AlignRight, Bold, Image, Italic, LineSquiggle } from "lucide-react";
import { useEffect, useState } from "react";
import { DiaryEntry } from "@/types/entry";
import { generateRandomId } from "@/lib/random";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


export function WritePageContent({id}:{id?:string|undefined}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUsername(data.username);
      }
    };

    loadUser();
  }, []);

  const applyStyle = (e: React.MouseEvent, command: string) => {
    // Prevent the button from taking focus away from the editor
    e.preventDefault();
    // if(command === "bold"){
    //   const selection = window.getSelection();
    //  const  range = selection?.getRangeAt(0);
    //   if(!range) return;
    //   if(range){
    // const editor = document.getElementById('editor');
    // if (!editor?.contains(range.commonAncestorContainer)) return;
    // const boldElement = document.createElement('strong');
    // try {
    //     boldElement.appendChild(range.extractContents());
    //     range.insertNode(boldElement);
    //     // range.
        
        
    // } catch (e) {
    //     console.error("Selection wrap failed", e);
    // }
    //   }
    // }
    document.execCommand(command, false, Buffer.from([]).toString());
  };
  if(id==undefined || id==null){
  id = generateRandomId();
  }
  const saveDiary = async () => {
    if (!username) {
      console.error("Cannot save diary entry: user is not loaded yet.");
      return;
    }

    const diaryEntry: DiaryEntry = {
      id,
      title,
      username,
      content,
      created_at: new Date(),
      mood: "happy",
    };

    if (!content || !content.trim() || content === "<br>") {
      showToast("Please enter some content before saving.", "error");
      return;
    }

    const response = await fetch("/api/diary", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryEntry),
    });

    if (response.ok) {
      router.push("/diary");
    } else {
      console.error("Failed to save diary entry", await response.text());
    }
  };
  
  return (
    <div className="">
      {/* Toolbar */}
      
      <div className="flex row gap-10 justify-center items-center  ">
        <div  className="write-toolbar mt-auto">
       <AlignLeft className="write-toolbar-button" onMouseDown={(e) => applyStyle(e, "justifyLeft")} />
       <AlignCenter className="write-toolbar-button" onMouseDown={(e) => applyStyle(e, "justifyCenter")} />
       <AlignRight className="write-toolbar-button" onMouseDown={(e) => applyStyle(e, "justifyRight")} />
      <Bold className="write-toolbar-button stroke-4"  onMouseDown={(e) => applyStyle(e, "bold")}/>
      <Italic className="write-toolbar-button stroke-2" onMouseDown={(e) => applyStyle(e, "italic")}/>
      
      <Image className="write-toolbar-button" onMouseDown={(e) => {
        
          document.execCommand("insertImage", false, "https://up.yimg.com/ib/th/id/OIP.Mvcr0QDsGXOx29cSBfXd6AHaE7?pid=Api&rs=1&c=1&qlt=95&w=187&h=124");
        
      }} />
      </div>
      <div className="flex row gap-2">
        <div className="w-0.5 mr-4 bg-black rounded-full"></div>
        <Button onClick={saveDiary}>Save</Button>
        <Button variant="destructive" > Delete </Button>
        </div>
      </div>
      {/* /* A4 size: 210mm x 297mm  */}
      <div className="flex row mt-9 item-center justify-center">
      <Input placeholder="Title" className="text-center w-fit" onChange={(e)=>setTitle(e.target.value)}></Input>
      </div>
      <div
        contentEditable
        id="editor"
        className="bg-white mx-auto shadow-lg h-[297mm] scale-90 w-[210mm] p-4"
        onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
      ></div>
       
        
    </div>
  );
}

 export default function WritePage({id}:{id?:string|undefined}) {
  return (
    <ToastProvider>
      <WritePageContent id={id}/>
    </ToastProvider>
  );
}

