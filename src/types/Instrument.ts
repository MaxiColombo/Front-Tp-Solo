import { CategoryInstrument } from "./CategoryInstrument";

export interface Instrument {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: CategoryInstrument;
    cantidad: number; // para guardar parcialmente la cantidad del instrumento en el cart
  }