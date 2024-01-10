import React from "react";
import { render } from "@testing-library/react";
import CreateBrewery from "./CreateBrewery";
import { MemoryRouter } from "react-router-dom";

test("renders CreateBrewery component without crashing", () => {
  render(
    <MemoryRouter>
      <CreateBrewery />
    </MemoryRouter>
  );
});

test("CreateBrewery component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CreateBrewery />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
