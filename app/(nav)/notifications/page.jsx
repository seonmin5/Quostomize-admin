'use client'
import 'react-quill-new/dist/quill.snow.css';
import './editor.css';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import PageHeader from "../../../components/header/pageHeader";
import ConfirmModal from "../../../components/modal/confirmModal";
import AlertModal from "../../../components/modal/alertModal";
import LoadingModal from '@/components/modal/loadingModal';


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

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState("");
  const [alertModalDescription, setAlertModalDescription] = useState("");
  const [alertModalSuccess, setAlertModalSucccess] = useState("");

  const [laodingModalOpen, setLoadingModalOpen] = useState(false); 


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
    const blob = new Blob([htmlContents], {type: "text/html"});
    return blob;
  }

  const onConfirm = () => {
    sendMail();
    setConfirmModalOpen(false);
  }

  const openConfirm = () => {
    console.log(title);
    console.log(htmlContents);
    console.log(title.trim() === "");
    console.log(htmlContents.trim() === "");

    if ((title.trim() === "" || htmlContents.trim() === "") === true) {
      setAlertModalTitle("알림 확인");
      setAlertModalDescription("제목 혹은 내용이 \n올바르지 않습니다")
      setAlertModalSucccess(false);
      setTimeout(() => {
        setAlertModalOpen(true);
      },0)
      setTimeout(() => {
        setAlertModalOpen(false);
      },2000)
      return;
    }
    setConfirmModalOpen(true);
  }


  const sendMail = async () => {
    setLoadingModalOpen(true);
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
        setAlertModalTitle("알림 확인");
        setAlertModalDescription("제목 혹은 내용이 \n올바르지 않습니다")
        setAlertModalSucccess(false);
        setTimeout(() => {
          setAlertModalOpen(true);
        },0)
        setTimeout(() => {
          setAlertModalOpen(false);
        },2000)
      } else {
        setAlertModalTitle("알림 전송 성공");
        setAlertModalDescription("알림을 성공적으로 \n보냈습니다")
        setAlertModalSucccess(true);
        setTimeout(() => {
          setAlertModalOpen(true);
        },0)
        setTimeout(() => {
          setAlertModalOpen(false);
        },2000)
      }
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
          onClick={() => openConfirm()}
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
        <QuillWrapper onChange={updateContents} theme="snow" modules={modules} style={importantStyle} defaultValue={"내용을 입력해주세요"}/>
      </div>
      <ConfirmModal title={"알림 보내기"} description={"알림을 보내시겠습니까?"} isOpen={confirmModalOpen} setIsOpen={setConfirmModalOpen} onClose={onConfirm}/>
      <AlertModal title={alertModalTitle} description={alertModalDescription} isOpen={alertModalOpen} setIsOpen={setAlertModalOpen} isSuccess={false}/>
      <LoadingModal message={"메일 발신 중입니다"} isOpen={laodingModalOpen}/>
    </div>
  ); 
}

export default Notifications;