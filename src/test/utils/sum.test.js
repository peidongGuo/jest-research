const sum = require("lodash/sum");
describe("测试 Lodash", () => {
  test("测试 sum 方法", () => {
    expect(sum([2, 3])).toBe(5);
  });
});
