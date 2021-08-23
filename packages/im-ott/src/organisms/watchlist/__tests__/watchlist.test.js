import React from "react";
import { render, cleanup } from "@testing-library/react";
import Watchlist from "../Watchlist";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("Watchlist should render correctly", () => {
  const tree = renderer.create(<Watchlist />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("This suit is to test the Watchlist Button component", () => {
  test("Snapshot of Add Remove Watchlist Button", () => {
    const { asFragment } = render(<Watchlist />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("add to watchlist", () => {
    const { getByTestId } = render(<Watchlist />);
    const ancestor = getByTestId("add-remove-watchlist-button");
    const plus = getByTestId("plus");

    expect(ancestor).toContainElement(plus);

    expect(getByTestId("add-remove-watchlist-label")).toHaveTextContent(
      "Watchlist"
    );
  });
});
