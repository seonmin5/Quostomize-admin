'use client'
import 'react-quill-new/dist/quill.snow.css';
import './editor.css';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/header/pageHeader"


const QuillWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
}

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [htmlContents, setHtmlContents] = useState("");
  const [optinalTerms, setOptinalTerms] = useState(-1);
  const [isSuccess, setSuccess] = useState(true);

  const [modalOpen, setModalOpen] = useState(false); 
  const [modalMessage, setModalMessage ] = useState(""); 

  const updateTitle = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 255) {
      setTitle(newTitle);
    }
  }

  const updateContents = (newContents) => {
    setHtmlContents(newContents);
  }

  const makeHtmlFile = () => {
    const blob = new Blob(htmlContents, {type: "text/html"});
    return blob;
  }

  const openModal = (modalMessage) => {
    setModalMessage(modalMessage);
    setTimeout(() => {
      setModalOpen(true);
    },0)
  }

  const sendMail = async () => {
    const htmlFile = makeHtmlFile();
    const response = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({
        title: title,
        optinalTerms: optinalTerms,
        htmlFile: htmlFile
      })
    })

    if (response.status === 400 || response.status === 200) {
      const result = await response.json();
      if (response.status === 400) {
        setSuccess(false);
      } else {
        setSuccess(true);
      }
      setTimeout(() => {
        openModal(result.message);
      }, 0)
    }

    if (response.status >= 401 && response.status <= 403) {
      redirect(response.url); 
    }
  }

  const importantStyle = {
    maxHeight: "500px !important",
    overflowY: "auto !important"
  }

  return (
    <div className="w-full max-w-full h-full">
      <PageHeader />
      <div className=' mt-6 px-10 flex justify-end'>
        <div 
          className='cursor-pointer bg-primary font-semibold text-white w-32 h-10 text-center leading-10 align-middle rounded-lg'
          onClick={() => sendMail()}
        >
          알림 보내기
        </div>
      </div>
      <div className="p-8 h-[calc(100%-5rem)]">
        <div className="flex gap-5 bg-content-secondary1 h-10 items-center px-2 border-2 border-content-secondary3">
          <div className="font-semibold">
            제목
          </div>
          <input 
            className="border-2 rounded-md grow text-xl h-8 leading-8 px-1 bg-content-secondary2" 
            onChange={(e) => updateTitle(e)}
          />
        </div>
        <QuillWrapper onChange={updateContents} theme="snow" modules={modules} style={importantStyle} placeholder="내용을 입력해주세요"/>
      </div>
    </div>
  ); 
}

export default Notifications;