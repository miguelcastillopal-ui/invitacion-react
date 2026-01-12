import { useState, useEffect } from "react";
import invitacionImg from "./assets/invitacion.jpg";
import "./App.css";

    const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const { width } = ctx.measureText(testLine);

    if (width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
};

function App() {
  const [tratamiento, setTratamiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const puedeDescargar = nombre.trim() && tratamiento;

  // ===== GENERAR INVITACIÓN (ÚNICA FUENTE DE VERDAD) =====
  const generarInvitacion = () => {
  



    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = invitacionImg;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Fondo
      ctx.drawImage(img, 0, 0);

      const scale = canvas.width / 400;

      ctx.fillStyle = "#496052";
      ctx.textAlign = "center";

      // ESTIMADO
      ctx.font = `bold ${28 * scale}px serif`;
      const yTratamiento = 60 * scale;
      ctx.fillText(tratamiento, canvas.width / 2, yTratamiento);

      // NOMBRE
      ctx.font = `bold ${36 * scale}px serif`;
      const yNombre = yTratamiento + 45 * scale;
      
      drawWrappedText(
    ctx,
    nombre || "Nombre del invitado",
    canvas.width / 2,
    yNombre,
    canvas.width * 1,
    48 * scale
    );


      setPreviewUrl(canvas.toDataURL("image/jpeg", 0.92));
    };
  };

  // Regenerar cada vez que cambia el texto
  useEffect(() => {
    generarInvitacion();
  }, [tratamiento, nombre]);

  // ===== DESCARGAR =====
  const descargarImagen = () => {
    if (!previewUrl) return;

    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "invitacion.jpg";
    link.click();
  };

  return (
    <div className="container">
      <h1>Invitación Personalizada</h1>

      <select
        value={tratamiento}
        onChange={(e) => setTratamiento(e.target.value)}
      >
        <option value="" disabled>
          Elija una opción
        </option>
        <option value="Hola">Hola</option>
        <option value="Estimado">Estimado</option>
        <option value="Estimada">Estimada</option>
        <option value="Estimados">Estimados</option>

      </select>

      <input
        type="text"
        placeholder="Escriba el nombre del invitado"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      {/* VISTA PREVIA REAL (CANVAS) */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Vista previa invitación"
          style={{ width: "100%", maxWidth: "420px", marginTop: "20px" }}
        />
      )}

      {/* BOTÓN DESCARGA */}
      <button
        className="descargar-btn"
        onClick={puedeDescargar ? descargarImagen : undefined}
        style={{
          cursor: puedeDescargar ? "pointer" : "not-allowed",
          opacity: puedeDescargar ? 1 : 0.6,
          marginTop: "15px",
        }}
      >
        Descargar invitación
      </button>
    </div>
  );
}

export default App;
