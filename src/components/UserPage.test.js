import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPage from "./UserPage";

test("renders UserPage component without crashing", () => {
  render(
    <MemoryRouter>
      <UserPage />
    </MemoryRouter>
  );
});

test("UserPage component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserPage />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
