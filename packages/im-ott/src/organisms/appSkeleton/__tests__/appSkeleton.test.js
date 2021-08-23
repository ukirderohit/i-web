import React from "react";
import { cleanup } from "@testing-library/react";
import AppSkeleton from "../AppSkeleton";
import renderer from "react-test-renderer";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  Link: "Link",
  useLocation: jest.fn().mockReturnValue({
    pathname: "/search",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it("AppSkeleton should render correctly", () => {
  const tree = renderer.create(<AppSkeleton />).toJSON();
  expect(tree).toMatchSnapshot();
});
