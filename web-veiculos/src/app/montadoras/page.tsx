"use client";

import { useEffect, useState } from "react";

export interface Montadora {
  id: number;
  modelos: string[];
  nome: string;
  pais: string;
  ano_fundacao: number;
}

export default function MontadorasPage() {
  const [montadoras, setMontadoras] = useState<Montadora[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMontadoras = async () => {
      const query = `
        query {
          montadoras {
            id
            nome
            pais
            ano_fundacao
          }
        }
      `;

      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Erro ao solicitar montadoras");
        }

        const { data } = await response.json();
        setMontadoras(data.montadoras);
      } catch (err) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchMontadoras();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Lista de Montadoras</h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {montadoras.map((montadora) => (
            <li key={montadora.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-2">
                {montadora.nome} <span className="text-gray-300">#{montadora.id}</span>
              </h2>
              <p className="text-gray-200">País: {montadora.pais}</p>
              <p className="text-gray-200">Ano de Fundação: {montadora.ano_fundacao}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
