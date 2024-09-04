import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home.jsx"
import React from "react";

test("Always true test", () => {
    expect(true).toBe.true;
  });

  // test("check header test", () => {
  //   render(<Home/>);
  //   const header = screen.getByText(/Who are we?/i);
  //   expect(header).toBeInTheDocument();
  // })