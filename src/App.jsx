import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import invitacionImg from "./assets/invitacion.jpg";
import "./App.css";


function App() {
  const [tratamiento, setTratamiento] = useState("");
  const [nombre, setNombre] = useState("");
  const invitacionRef = useRef(null);
  const puedeDescargar = nombre.trim() && tratamiento;
  


const descargarImagen = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = invitacionImg;
  img.crossOrigin = "anonymous";

  img.onload = () => {
    // Tamaño real de la imagen
    canvas.width = img.width;
    canvas.height = img.height;

    // Fondo
    ctx.drawImage(img, 0, 0);

    // Texto común
    ctx.fillStyle = "#496052";
    ctx.textAlign = "center";

    // Tratamiento
    ctx.font = "bold 28px serif";
    ctx.fillText(tratamiento, canvas.width / 2, 90);

    // Nombre (salta línea si es largo)
    ctx.font = "bold 36px serif";
    wrapText(
      ctx,
      nombre || "Nombre del invitado",
      canvas.width / 2,
      150,
      canvas.width * 0.8,
      42
    );

    // Descargar
    const link = document.createElement("a");
    link.download = "invitacion.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.click();
  };
};

const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
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

      {/* INVITACIÓN */}
      <div className="invitacion" ref={invitacionRef}>
        
          <img
          src={invitacionImg}
          alt="Invitación"
          onLoad={() => setImagenLista(true)}
          crossOrigin="anonymous"
          />


        <div className="tratamiento-overlay">
          {tratamiento}
        </div>

        <div className="nombre-overlay">
          {nombre || "Nombre del invitado"}
        </div>
      </div>

      {/* BOTÓN DESCARGA */}

<button
  className="descargar-btn"
  onClick={puedeDescargar ? descargarImagen : undefined}
  title={
    puedeDescargar
      ? ""
      : "No disponible: debe elegir una opción y/o escribir el nombre del invitado"
  }
  style={{
    cursor: puedeDescargar ? "pointer" : "not-allowed",
    opacity: puedeDescargar ? 1 : 0.6,
  }}
>
  Descargar invitación
</button>


    </div>
  );
}

export default App;
