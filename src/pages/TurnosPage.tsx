import { Calendar, ExternalLink } from "lucide-react";

const NOTION_FORM_URL =
  "https://thinkable-virgo-565.notion.site/7650a420ff2a465bad52c7fec7d6ec1d?pvs=105";

export function TurnosPage() {
  const goToForm = () => {
    window.open(NOTION_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Solicitud de Turno
        </h1>

        <p className="text-gray-600 mb-8">
          Para solicitar un turno, deberá completar el formulario oficial.
          Una vez enviado, nos contactaremos para asignarle día y horario.
        </p>

        <div
          onClick={goToForm}
          className="cursor-pointer bg-white border rounded-xl p-10 shadow-sm hover:shadow-md transition text-center"
        >
          <Calendar className="h-14 w-14 text-accent mx-auto mb-4" />

          <h2 className="text-2xl font-semibold mb-2">
            Abrir Formulario de Turnos
          </h2>

          <p className="text-gray-500 mb-6">
            Click aquí para continuar al formulario oficial
          </p>

          <div className="inline-flex items-center gap-2 text-accent font-semibold">
            <span>Continuar</span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
