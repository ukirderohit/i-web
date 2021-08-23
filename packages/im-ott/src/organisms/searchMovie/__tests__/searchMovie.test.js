import React from "react";
import { render, cleanup } from "@testing-library/react";
import SearchMovie from "../SearchMovie";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("<SearchMovie/> should render correctly", () => {
  const tree = renderer.create(<SearchMovie />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("This suit is to test the SearchMovie component", () => {
  test("Snapshot SearchMovie", () => {
    const { asFragment } = render(<SearchMovie />);
    expect(asFragment()).toMatchSnapshot();
  });
});
