import React from "react";
import { cleanup } from "@testing-library/react";
import FilmDetails from "../FilmDetails";
import renderer from "react-test-renderer";
import Router from "react-router-dom";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: "Link",
  useParams: jest.fn(),
  useLocation: jest.fn().mockReturnValue({
    pathname: "/film/abc-def-456-rfg-sfg",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it("FilmDetails should render correctly", () => {
  jest.spyOn(Router, "useParams").mockReturnValue({ filmId: "5678" });
  const tree = renderer.create(<FilmDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});
