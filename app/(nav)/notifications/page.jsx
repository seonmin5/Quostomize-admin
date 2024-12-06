'use client'
import 'react-quill-new/dist/quill.snow.css';
import './editor.css';

import { useState } from "react";
import dynamic from "next/dynamic";

import ConfirmModal from "../../../components/modal/confirmModal";
import AlertModal from "../../../components/modal/alertModal";
import LoadingModal from '../../../components/modal/loadingModal';
import { Select } from '@headlessui/react';
import SubmitButtonV2 from "../../../components/button/submitButtonV2";
import SkeletonLoader from "../../../components/spinner/skeletonLoader";

const QuillWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () =>
      <div className="p-6">
        <SkeletonLoader/>
      </div>,
})

const modules = {
  toolbar: [
    [{'header': [1, 2, false]}],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
}

const Notifications = () => {
  const tabs = ['전체 알림', '선택 알림'];

  const [title, setTitle] = useState("");
  const [htmlContents, setHtmlContents] = useState("");
  const [optionalTerms, setOptinalTerms] = useState("-1");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState("");
  const [alertModalDescription, setAlertModalDescription] = useState("");
  const [alertModalSuccess, setAlertModalSucccess] = useState("");

  const [loadingModalOpen, setLoadingModalOpen] = useState(false); 

  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleTabClick = (index) => {
    if (index === 0) {
      setOptinalTerms(-1);
    } else {
      setOptinalTerms(0);
    }
    setActiveIndex(index);
  };

  const updateTitle = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 255) {
      setTitle(newTitle);
    }
  }

  const updateContents = (newContents) => {
    setHtmlContents(newContents);
  }

  const onConfirm = () => {
    sendMail();
    setConfirmModalOpen(false);
  }

  const openConfirm = () => {

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('optionalTerms', optionalTerms);
    formData.append('htmlFile', new Blob([htmlContents], {type: "text/html"}));
    const response = await fetch("/api/mail", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      duplex: "half",
      body: formData
    })

    if (response.status === 400 || response.status === 200) {
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
    setLoadingModalOpen(false);

    if (response.status >= 401 && response.status <= 403) {
      redirect(response.url); 
    }
  }

  const importantStyle = {
    maxHeight: "500px !important",
    overflowY: "auto !important"
  }
  
  return (
    <div className="pt-8 pl-6">
      <div role={"tablist"} className="flex space-x-4 border-b">
          {tabs.map((tab, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => handleTabClick(index)}
                className={`py-2 px-4 text-gray-600 hover:text-[#3081F7] ${
                    activeIndex === index ? "border-b-4 border-[#3081F7] font-semibold text-[#3081F7]" : ""
                }`}>
                  {tab}
              </button>
          ))}
      </div>
      <div className="w-full max-w-full h-full">
        <div className='mt-6 h-14 px-10 flex justify-between items-end'>
          {
            activeIndex === 1
            ?
              <div>
                <div className='pl-1 text-content-accent1'>약관 동의 유형선택</div>
                <Select 
                  name="status"
                  aria-label="Project status"
                  className="border border-content-accent3 rounded-md font-bold bg-transparent px-1"
                  onChange={(e) => setOptinalTerms(e.target.value)}
                >
                  <option value="0">필수 약관 동의 회원</option>
                  <option value="1">제3자 제공 동의 회원</option>
                  <option value="2">광고성 수신 동의 회원</option>
                  <option value="3">전체 동의 회원</option>
                </Select>
              </div>
            :
              <div></div>
          }
          <SubmitButtonV2 onClick={() => openConfirm()}>
            알림 보내기
          </SubmitButtonV2>

        </div>
        <div className="pt-8 pr-8 h-[calc(100%-5rem)]">
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
        <AlertModal title={alertModalTitle} description={alertModalDescription} isOpen={alertModalOpen} setIsOpen={setAlertModalOpen} isSuccess={alertModalSuccess}/>
        <LoadingModal message={"메일 발신 중입니다"} isOpen={loadingModalOpen}/>
      </div>
    </div>
  )
}

export default Notifications;