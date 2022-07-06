import React from "react";
import Message from "./Message";
export default function (props) {
  let messages = props.messages;
  return (
    <ul className="list-group">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </ul>
  );
}
