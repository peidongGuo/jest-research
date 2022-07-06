import React, { useState, useCallback } from "react";
export default function (props) {
  let [content, setContent] = useState("");
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (content) {
        props.addMessage(content);
        setContent("");
      }
    },
    [content]
  );
  return (
    <form role="form2">
      <div className="form-group">
        <input
          name="input"
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="form-control"
          placeholder="请输入内容"
        />
      </div>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          发表
        </button>
      </div>
    </form>
  );
}
