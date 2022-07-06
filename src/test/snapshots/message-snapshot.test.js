import renderer from "react-test-renderer";
import Message from "../../components/Message";

describe("快照测试", () => {
  test("render Message component correctly", () => {
    let message = { id: "1", content: "zhufeng" };
    const tree = renderer.create(<Message message={message} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
