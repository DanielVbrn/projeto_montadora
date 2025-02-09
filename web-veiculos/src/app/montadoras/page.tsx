
export interface Montadora {
    id: number;
    modelos: string[];
    nome: string;
    pais: string;
    ano_fundacao: number;
  }
  
  export default async function Montadora() {
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
    const montadoras: Montadora[] = data.montadoras; 
  
    return (
      <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1>Lista de Montadoras</h1>
  
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
  