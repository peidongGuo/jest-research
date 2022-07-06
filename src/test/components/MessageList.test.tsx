import React from "react";
import MessageList from "../../components/MessageList";
import { render, screen } from "@testing-library/react";
describe("测试MessageList", () => {
  test("传入2个留言,应该渲染出来2个li", () => {
    let messages = [
      { id: "1", content: "zhufeng" },
      { id: "2", content: "jiagou" },
    ];
    render(<MessageList messages={messages} />);
    expect(screen.getByText("zhufeng")).toBeInTheDocument();
    expect(screen.getByText("jiagou")).toBeInTheDocument();
  });
});
