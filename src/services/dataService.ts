// Servicio para obtener los datos de la API
import axios from 'axios';

const API_URL = 'https://67eb17c934bcedd95f6572a9.mockapi.io/api/presupuestos/presupuestos';

export interface Presupuesto {
  proyecto: string;
  precio: number;
  cliente: string;
  contacto: string;
  id: string;
}

export class PresupuestoService {
  // Obtener todos los presupuestos
  static async getAllPresupuestos(): Promise<Presupuesto[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna la lista de presupuestos
    } catch (error) {
      console.error('Error al obtener los presupuestos:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Obtener un presupuesto por ID
  static async getPresupuestoById(id: string): Promise<Presupuesto> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Retorna el presupuesto específico
    } catch (error) {
      console.error(`Error al obtener el presupuesto con ID ${id}:`, error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
}
