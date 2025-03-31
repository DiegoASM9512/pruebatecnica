//servicio de Loogin con fetch usando un get y luego iterando a los usuarios para ver si existe el usuario y la contraseña
import axios from 'axios';

const API_URL = 'https://67eb17c934bcedd95f6572a9.mockapi.io/api/presupuestos/register';

export interface LoginCredentials {
  name: string;
  password: string;
}

export class LoginService {
  static async login(name: string, password: string): Promise<boolean> {
    try {
      // Realizamos una solicitud GET para obtener todos los usuarios
      const response = await axios.get(API_URL);
      const users = response.data;

      // Buscamos un usuario que coincida con el nombre y la contraseña
      const user = users.find((u: any) => u.name === name && u.password === password);

      if (user) {
        return true; // Login exitoso
      } else {
        throw new Error('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
}


