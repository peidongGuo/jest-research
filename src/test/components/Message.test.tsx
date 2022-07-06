import React from "react";
import Message from "../../components/Message";
import { render, screen } from "@testing-library/react";
describe("测试Message", () => {
  test("应该渲染出来一个li,类名list-group-item,内容是zhufeng", () => {
    let message = { id: "1", content: "zhufeng" };
    render(<Message message={message} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("listitem").getAttribute("class")).toBe(
      "list-group-item"
    );
    expect(screen.getByRole("listitem").innerHTML).toContain("zhufeng");
  });
});
