import React from "react";
import { render } from "@testing-library/react";
import BreweriesList from "./BreweriesList";

test("renders BreweriesList component without crashing", () => {
  render(<BreweriesList />);
});

test("BreweriesList component matches snapshot", () => {
  const { asFragment } = render(<BreweriesList />);
  expect(asFragment()).toMatchSnapshot();
});
