import axios from "axios";
import Users from "../../users";
import defaultExport, { bar, foo } from "../../foo-bar-baz";

jest.mock("axios");
jest.mock("../../foo-bar-baz", () => {
  const originModule = jest.requireActual("../../foo-bar-baz");

  return {
    __esModule: true,
    ...originModule,
    // default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const myMock1 = jest.fn();
const aInstance = new myMock1();
console.log(JSON.stringify(myMock1.mock.instances));
const myMock2 = jest.fn();
console.log(myMock2());
myMock2.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);
console.log(myMock2(), myMock2(), myMock2(), myMock2());

const filterTestFn = jest.fn();
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
const result = [11, 12].filter((num) => filterTestFn(num));
console.log(result);
console.log(filterTestFn.mock.calls[0][0]);
console.log(filterTestFn.mock.calls[1][0]);

describe("测试 mock", () => {
  test("测试 forEach", () => {
    const mockCallback = jest.fn((x) => 2 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });
  test("测试 forEach2", () => {
    const mockCallback = jest.fn((x) => 2 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
  });
  test("测试 forEach3", () => {
    const mockCallback = jest.fn((x) => 2 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  test("测试 forEach4", () => {
    const mockCallback = jest.fn((x) => 2 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.results[1].value).toBe(3);
  });

  test("测试 axios", () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    axios.get.mockResolvedValue(resp);
    return Users.all().then((data) => expect(data).toEqual(users));
  });

  test("测试 partial mock", () => {
    console.log(defaultExport());

    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe("baz");
    // expect(defaultExport).toHaveBeenCalled();
    expect(foo).toBe("mocked foo");
    expect(bar()).toBe("bar");
  });
});
