import React, { useEffect, useState } from 'react';
import { PresupuestoService, Presupuesto } from '../services/dataService';

const Home: React.FC = () => {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState<Presupuesto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        const data = await PresupuestoService.getAllPresupuestos();
        setPresupuestos(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los presupuestos');
      }
    };

    fetchPresupuestos();
  }, []);

  const openModal = (presupuesto: Presupuesto) => {
    setSelectedPresupuesto(presupuesto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPresupuesto(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Presupuestos</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {presupuestos.map((presupuesto) => (
          <div
            key={presupuesto.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              width: '250px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => openModal(presupuesto)}
          >
            <h3 style={{ color: '#555' }}>{presupuesto.proyecto}</h3>
            <p style={{ color: '#777' }}>Cliente: {presupuesto.cliente}</p>
            <p style={{ color: '#777' }}>Precio: {presupuesto.precio}€</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPresupuesto && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              width: '400px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#333' }}>{selectedPresupuesto.proyecto}</h2>
            <p style={{ color: '#555' }}>Cliente: {selectedPresupuesto.cliente}</p>
            <p style={{ color: '#555' }}>Contacto: {selectedPresupuesto.contacto}</p>
            <p style={{ color: '#555' }}>Precio: {selectedPresupuesto.precio}€</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;