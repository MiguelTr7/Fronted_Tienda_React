import React from "react";
import { render, screen } from "@testing-library/react";
import BarraNavegacion from "../components/Navbar";

describe("Navbar", () => {
  it("muestra la marca de la tienda", () => {
    render(<BarraNavegacion cantidad={0} total={0} />);
    expect(screen.getByText("Tienda Puerto Montt")).not.toBeNull();
  });

  it("muestra el total y cantidad de items correctamente", () => {
    render(<BarraNavegacion cantidad={2} total={20000} />);
    expect(screen.getByText("🛒 2 items — $20000")).not.toBeNull();
  });
});
