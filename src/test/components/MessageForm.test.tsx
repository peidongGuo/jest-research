import React from "react";
import MessageForm from "../../components/MessageForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("测试MessageForm", () => {
  test("应该渲染出来一个表单,表单里有input和button", () => {
    let addMessage = jest.fn();
    render(<MessageForm addMessage={addMessage} />);
    expect(screen.getByRole("form2")).toBeInTheDocument();
    expect(screen.getByRole(`textbox`)).toBeInTheDocument();
    expect(screen.getByRole(`button`)).toBeInTheDocument();
  });
  test("在输入框里输入内容,如果内容为空点击提交按钮不会添加留言", async () => {
    let addMessage = jest.fn();
    render(<MessageForm addMessage={addMessage} />);
    screen.getByRole("textbox").nodeValue = "";
    await userEvent.click(screen.getByRole("button"));
    expect(addMessage).not.toHaveBeenCalled();
  });
  test("在输入框里输入内容,如果内容不为空点击提交按钮会添加留言", async () => {
    let addMessage = jest.fn();
    render(<MessageForm addMessage={addMessage} />);
    const newValue = "新留言";
    await userEvent.type(screen.getByRole("textbox"), newValue);
    await userEvent.click(screen.getByRole("button"));
    expect(addMessage).toHaveBeenLastCalledWith(newValue);
  });
});
