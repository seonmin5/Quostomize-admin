'use client'
import 'react-quill-new/dist/quill.snow.css';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/header/pageHeader"


const QuillWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [htmlContents, setHtmlContents] = useState("");

  const updateTitle = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  }

  const updateContents = (newContents) => {
    setHtmlContents(newContents);
  }

  

  return (
    <div className="w-full">
      <PageHeader />
      <div className="p-8">
        <div className="flex gap-5 mb-10">
          <div className="text-xl font-semibold">
            제목
          </div>
          <input 
            className="border-2 rounded-md grow text-xl h-8 leading-8 px-1" 
            onChange={(e) => updateTitle(e)}
          />
        </div>
        <QuillWrapper onChange={updateContents} theme="snow" />
      </div>
    </div>
  ); 
}

export default Notifications;