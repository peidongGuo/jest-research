import React from "react";
export default function (props) {
  let { content } = props.message;
  return <li className="list-group-item">{content}</li>;
}
