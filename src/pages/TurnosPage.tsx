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
            src="https://thinkable-virgo-565.notion.site/ebd//ecbb3c6ab31440308c2fb121c9c00484?v=0522da5c313e43138f9fb2f78b048b1f"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>

      </div>
    </div>
  );
}
