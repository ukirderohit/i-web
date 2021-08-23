import React from "react";
import { cleanup } from "@testing-library/react";
import AllComments from "../AllComments";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("AllComments should render correctly", () => {
  const tree = renderer
    .create(<AllComments videoId={"7ff45b15-d66b-476f-bf2b-d412bda0036b"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
