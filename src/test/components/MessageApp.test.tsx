import React from "react";
import MessageApp from "../../components/MessageApp";
import { render, screen } from "@testing-library/react";
import $ from "jquery";
describe("测试MessageApp", () => {
  test("应该渲染出来一个面板", () => {
    render(<MessageApp />);
    const container = screen.getByRole(`application`);
    const panel = $(`.panel.panel-default`);
    const panelHeading = $(`.panel-heading`);
    const panelBody = $(`.panel-body`);
    const panelFooter = $(`.panel-footer`);
    expect(container).toBeInTheDocument();
    expect(panel).toHaveLength(1);
    expect(panelHeading).toHaveLength(1);
    expect(panelBody).toHaveLength(1);
    expect(panelFooter).toHaveLength(1);
  });
  test("默认状态是空数组", () => {
    render(<MessageApp />);
    expect($(".panel-body ul li")).toHaveLength(0);
  });
  test("MessageList组件存在", () => {
    render(<MessageApp />);
    expect($(".panel-body ul")).toHaveLength(1);
  });
});
