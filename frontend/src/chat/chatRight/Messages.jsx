import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js'
import Loading from '../../components/Loading.jsx'
import useGetSocketMessages from '../../context/useGetSocketMessages.js';

export default function Messages() {

  const { loading, messages } = useGetMessage();
  useGetSocketMessages();

 
  const validMessages = Array.isArray(messages) ? messages : [];
 console.log(messages)
 const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div className='' style={{ minHeight: 'calc(92vh - 8vh)' }}>
      {loading ? (
        <Loading />
      ) : (
        validMessages.length > 0 &&
        validMessages.map((message) => (
          <div key={message._id} ref={lastMsgRef}> 
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && validMessages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">Say Hi to start a conversation</p>
        </div>
      )}
    </div>
  );
}
