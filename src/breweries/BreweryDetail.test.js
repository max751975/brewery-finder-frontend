import React from "react";
import { render } from "@testing-library/react";
import BreweryDetail from "./BreweryDetail";
import { MemoryRouter } from "react-router-dom";

test("renders BreweryDetail component without crashing", () => {
  render(
    <MemoryRouter>
      <BreweryDetail />
    </MemoryRouter>
  );
});

test("BreweryDetail component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <BreweryDetail />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
