import React from "react";
import { Card, Button } from "react-bootstrap";

export default function CardProducto({ nombre, precio, imagen, onAgregar }) {
  return (
    <Card className="m-3 shadow-sm" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body className="text-center">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>${precio}</Card.Text>
        <Button variant="primary" onClick={() => onAgregar({ nombre, precio })}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}
