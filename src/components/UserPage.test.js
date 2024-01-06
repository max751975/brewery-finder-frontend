import React from "react";
import { render } from "@testing-library/react";
import UserPage from "./UserPage";

test("renders UserPage component without crashing", () => {
  render(<UserPage />);
});

test("UserPage component matches snapshot", () => {
  const { asFragment } = render(<UserPage />);
  expect(asFragment()).toMatchSnapshot();
});
