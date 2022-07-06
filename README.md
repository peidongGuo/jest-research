
前端项目测试的分类
1. 公共工具/方法 的测试；
2. 数据接口层测试；
3. UI层测试；
4. 集成测试；
JEST 是怎么解决各类测试的呢？
公共工具/方法的测试
这个是最简单的测试。基本属于函数式编程，同样的输入就会有同样的输出。
const sum = require("lodash/sum");
describe("测试 Lodash", () => {
  test("测试 sum 方法", () => {
    expect(sum([2, 3])).toBe(5);
  });
});

数据接口层测试
一般前端项目中，请求数据都会做成 service 层，暴露一些异步请求方法出来。咱们可以直接用异步请示来模拟一下。
const axios = require("axios");

function fetchData3() {
  return axios
    .get("https://api.github.com")
    .then((result) => {
      return result;
    })
    .catch((err) => {});
}
function fetchData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(111);
    }, 2000);
  });
}
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111);
    }, 2000);
  });
}

describe("测试异步流程", () => {
  test("测试 fetchData", async () => {
    expect(await fetchData()).toBe(111);
  });
  test("测试 fetchData error", async () => {
    await expect(fetchData2()).rejects.toBe(111);
  });
  test("测试 fetchData error2", async () => {
    expect.assertions(1); // ? 为啥子
    try {
      await fetchData2();
    } catch (e) {
      expect(e).toBe(111);
    }
  });
  test("测试 ajax 请求 ", async () => {
    let result = await fetchData3();
    console.log(result);
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});

UI 层测试
每当你想要确保你的UI不会有意外的改变，快照测试是非常有用的工具。
典型的做法是在渲染了UI组件之后，保存一个快照文件， 检测他是否与保存在单元测试旁的快照文件相匹配。 若两个快照不匹配，测试将失败：有可能做了意外的更改，或者UI组件已经更新到了新版本。
测试React组件可以采用类似的方法。 你只需要测试对应的React树的序列号值即可，而不需要渲染整个React程序。 
快照文件应该和项目代码一起提交并做代码评审。 Jest uses pretty-format to make snapshots human-readable during code review. 在随后的单元测试例子中，Jest会对比上一个快照和渲染输出。 如果它们相匹配，则测试通过。 若未能匹配，要么是单元测试发现了你代码中的Bug，要么是代码实现已经变了，需要更新测试快照文件。
在代码引入错误后，很容易就通过快照发现为何单元测试失败了。 发生这种情况时，需要解决以使你的快照测试再次通过。 现在，让我们讨论一个故意使快照测试失败的案例。
import renderer from "react-test-renderer";
import Message from "../../components/Message";

describe("快照测试", () => {
  test("render Message component correctly", () => {
    let message = { id: "1", content: "zhufeng" };
    const tree = renderer.create(<Message message={message} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

集成测试
集成就是从用户使用这个组件的角度进行测试。这个时间需要使用 JEST+ React Test Library 来做。
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


端到端测试
端到端测试就是模拟用户在真实环境下使用这个模块的整体功能。需要使用无头浏览器。JEST + Puppteer。
let puppeteer = require("puppeteer");
let $ = require("jquery");
var browser;
var page;
const delay = (ms) =>
  new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, ms);
  });
describe("测试无头浏览器", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.baidu.com/");
  });

  it("初始标题是对的", async () => {
    await expect(page.title()).resolves.toMatch("百度一下，你就知道");
  });

  it("打开页面后左上角的导航按钮是否是7个", async () => {
    await delay(2000);
    const divsCounts = await page.$$eval(
      "#s-top-left a.mnav",
      (divs) => divs.length
    );

    // $("#s-top-left a")[0].val("github");
    // await page.click("input#su");

    // await delay(2000);
    await expect(divsCounts).toBe(7);
  });
  afterAll(async () => {
    await browser.close();
  });
});

JEST 一些其它功能
1. 简洁的 javascript 测试框架；
2. 开箱即用；
3. 支持 Babel、TypeScript、Node、React、Angular、Vue 等诸多框架！
4. 支持代码覆盖率的计算；
5. 强大的模拟函数功能，让你可从任何一层程序开始测试；
Ant  Design 项目测试方案
1. 测试框架：JEST
2. 测试工具集： react-dom/test-utils   test-library/react   enzyme

3.  ant design 这种混用的测试方式，不为官方推荐。最好是在老项目里用 enzyme，在新项目中拥抱 react-testing-library；原因，enzyme 三年没有更新了   Test-library/react-testing-library 最新更新日在3天前。
4. 每个组件单独做一个文件夹，然后每个里面去做测试用例、说明文档等
参考链接
  1. jest
2. puppteer 中文
