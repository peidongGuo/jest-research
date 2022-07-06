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

  it("点击搜索按钮", async () => {
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
// describe("测试 puppeteer", () => {
//   test("测试珠峰架构公开课的网站", function () {
//     let puppeteer = require("puppeteer");
//     const delay = (ms) =>
//       new Promise(function (resolve) {
//         setTimeout(() => {
//           resolve();
//         }, ms);
//       });
//     (async () => {
//       const browser = await puppeteer.launch({ headless: false });
//       const page = await browser.newPage();
//       await page.goto(
//         "http://zhufengpeixun.com/strong/html/90.react-test.html#t01.%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E6%B5%8B%E8%AF%95"
//       );
//       await page.click('button[id="counter1"]');
//       await delay(1000);
//       await page.click('button[id="counter1-increment"]');
//       await delay(1000);
//       await page.click('button[id="counter2"]');
//       await delay(1000);
//       await page.click('button[id="counter2-decrement"]');
//       await browser.close();
//     })();
//   });
// });
