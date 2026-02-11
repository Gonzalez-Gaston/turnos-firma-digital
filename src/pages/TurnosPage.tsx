export function TurnosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Solicitud de Turno
        </h1>

        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario. Una vez recibido, nos contactaremos
          para asignarle día y horario según disponibilidad.
        </p>

        <div className="w-full h-[800px] bg-white border rounded-xl overflow-hidden shadow-sm">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSesvDlcJFVL2fLJuBxGwqdXNSP5ft3Ez24eUSG5E3YZptnexQ/viewform?usp=publish-editor"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>

      </div>
    </div>
  );
}
