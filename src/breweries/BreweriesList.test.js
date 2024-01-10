import React from "react";
import { render } from "@testing-library/react";
import BreweriesList from "./BreweriesList";
import { MemoryRouter } from "react-router-dom";

test("renders BreweriesList component without crashing", () => {
  render(
    <MemoryRouter>
      <BreweriesList />
    </MemoryRouter>
  );
});

test("BreweriesList component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <BreweriesList />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
