import React from 'react';

function Message({ text, type }) {
  if (!text) {
    return null;
  }

  // Define a classe CSS com base no tipo da mensagem
  const messageClass = `message ${type}`; // ex: "message error"

  return (
    <div className={messageClass}>
      {text}
    </div>
  );
}

export default Message;
