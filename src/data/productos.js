import martillo from "../assets/img/martillo.jpg";
import Taladro from "../assets/img/Taladro.jpg";
import Destorniladores from "../assets/img/destornilladores.jpg";
import Cajadeherramientas from "../assets/img/Caja_de_herramientas.jpg";
import Llaves from "../assets/img/Llaves.jpg";
import Escalera from "../assets/img/Escalera.jpg";
import Sierra from "../assets/img/Sierra.jpg";
import Guantes from "../assets/img/Guantes.jpg";
import Linterna from "../assets/img/Linterna.jpg";
import Cinta from "../assets/img/Cinta.jpg";

// Aquí se añaden las categorías
const productos = [
  {
    id: 1,
    nombre: "Martillo de acero",
    precio: 8990,
    imagen: martillo,
    categoriaId: 1, // Categoría 1: Herramientas manuales
  },
  {
    id: 2,
    nombre: "Taladro inalámbrico",
    precio: 45990,
    imagen: Taladro,
    categoriaId: 2, // Categoría 2: Herramientas eléctricas
  },
  {
    id: 3,
    nombre: "Set de destornilladores",
    precio: 12500,
    imagen: Destorniladores,
    categoriaId: 1, // Categoría 1: Herramientas manuales
  },
  {
    id: 4,
    nombre: "Caja de herramientas",
    precio: 29990,
    imagen: Cajadeherramientas,
    categoriaId: 1, // Categoría 1: Herramientas manuales
  },
  {
    id: 5,
    nombre: "Juego de llaves combinadas",
    precio: 18990,
    imagen: Llaves,
    categoriaId: 1, // Categoría 1: Herramientas manuales
  },
  {
    id: 6,
    nombre: "Escalera de aluminio",
    precio: 79990,
    imagen: Escalera,
    categoriaId: 3, // Categoría 3: Accesorios de construcción
  },
  {
    id: 7,
    nombre: "Sierra circular eléctrica",
    precio: 99990,
    imagen: Sierra,
    categoriaId: 2, // Categoría 2: Herramientas eléctricas
  },
  {
    id: 8,
    nombre: "Guantes de trabajo reforzados",
    precio: 4990,
    imagen: Guantes,
    categoriaId: 4, // Categoría 4: Seguridad y protección
  },
  {
    id: 9,
    nombre: "Linterna recargable LED",
    precio: 8990,
    imagen: Linterna,
    categoriaId: 5, // Categoría 5: Iluminación
  },
  {
    id: 10,
    nombre: "Cinta métrica profesional 5m",
    precio: 3990,
    imagen: Cinta,
    categoriaId: 1, // Categoría 1: Herramientas manuales
  },
];

export default productos;
