import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import invitacionImg from "./assets/invitacion.jpg";
import "./App.css";
import { toJpeg } from "html-to-image";


function App() {
  const [tratamiento, setTratamiento] = useState("");
  const [nombre, setNombre] = useState("");
  const invitacionRef = useRef(null);
  const puedeDescargar = nombre.trim() && tratamiento;
  


const descargarImagen = async () => {
  if (!invitacionRef.current) return;

  try {
    const dataUrl = await toJpeg(invitacionRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      quality: 0.92,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "invitacion.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al generar la imagen:", error);
    alert("No se pudo descargar la invitación");
  }
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
