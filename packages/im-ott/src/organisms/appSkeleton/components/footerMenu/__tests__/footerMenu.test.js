import React from "react";
import { cleanup } from "@testing-library/react";
import FooterMenu from "../FooterMenu";
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

it("FooterMenu should render correctly", () => {
  const tree = renderer.create(<FooterMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});
