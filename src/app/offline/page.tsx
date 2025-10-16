export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>🚫 Sin conexión</h1>
      <p>No tienes acceso a Internet. Algunas funciones pueden no estar disponibles.</p>
    </div>
  );
}
