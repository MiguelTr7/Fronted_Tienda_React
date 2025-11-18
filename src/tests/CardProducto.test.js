import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardProducto from "../components/CardProducto";

describe("CardProducto", () => {
  const producto = { nombre: "Cable HDMI 4K", precio: 4990, imagen: "hdmi.jpg" };

  it("renderiza el nombre y el precio del producto correctamente", () => {
    render(<CardProducto {...producto} onAgregar={() => {}} />);
    expect(screen.getByText("Cable HDMI 4K")).toBeInTheDocument();
    expect(screen.getByText("$4990")).toBeInTheDocument();
  });

  it("llama a la función onAgregar cuando se hace clic en el botón", () => {
    const mockAgregar = jasmine.createSpy("onAgregar");
    render(<CardProducto {...producto} onAgregar={mockAgregar} />);
    fireEvent.click(screen.getByText("Agregar al carrito"));
    expect(mockAgregar).toHaveBeenCalled();
  });
});
