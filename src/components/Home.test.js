import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

test("renders Home component without crashing", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

test("Home component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
