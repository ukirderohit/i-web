import React from "react";
import { cleanup } from "@testing-library/react";
import Participants from "../Participants";
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

it("Participants should render correctly", () => {
  const tree = renderer.create(<Participants />).toJSON();
  expect(tree).toMatchSnapshot();
});
