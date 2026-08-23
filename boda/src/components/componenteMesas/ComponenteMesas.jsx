import { useMesas } from "../../hooks/useMesas";

export default function ComponenteMesas() {
  const { mesas, refrescarMesas, error } = useMesas();

  return (
    <div className="componente-mesas">
      <h1>Mesas</h1>
      <p>Este es el componente de mesas.</p>
    </div>
  );
}
