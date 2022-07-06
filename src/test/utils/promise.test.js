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
    // console.log(result);
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});
