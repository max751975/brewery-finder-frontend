import React from "react";
import { render } from "@testing-library/react";
import UpdateBrewery from "./UpdateBrewery";
import { MemoryRouter } from "react-router-dom";

test("renders UpdateBrewery component without crashing", () => {
  render(
    <MemoryRouter>
      <UpdateBrewery />
    </MemoryRouter>
  );
});

test("UpdateBrewery component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UpdateBrewery />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
