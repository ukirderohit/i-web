import React from "react";
import { cleanup } from "@testing-library/react";
import CommentThread from "../CommentThread";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("CommentThread should render correctly", () => {
  const tree = renderer.create(<CommentThread />).toJSON();
  expect(tree).toMatchSnapshot();
});
