import React from "react";
import { cleanup } from "@testing-library/react";
import Banner from "../Banner";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("<Banner/> should render correctly", () => {
  const tree = renderer.create(<Banner />).toJSON();
  expect(tree).toMatchSnapshot();
});
