"use client";

import { useEffect, useRef, useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJrHdXHzjrhl0xLsRRZTvTwmud0zvv3qlTFd7KSxbK0RnUY-ErFIVXz0xdNTwnkwCvPw/exec";

// CONFIGURACIÓN DE PREGUNTAS
const preguntas: Record<string, string[]> = {
  "Patio de juegos": [
    "Cantidad de Personas en Trepadores", "Cantidad de Personas en Tobogan", "Cantidad de Personas en Resortes",
    "Cantidad de Personas en Sube y Baja", "Cantidad de Personas en Calesitas", "Cantidad de Personas en Paneles",
    "Cantidad de Personas en Mangrullo", "Cantidad de Personas en Lomada", "Cantidad de Hamacas", "Observaciones",
  ],
  Canil: ["Cantidad de Vecinos", "Cantidad de Paseadores", "Cantidad de Perros", "Observaciones"],
  "Area deportiva": [
    "Cantidad de Personas en Cancha de Fútbol/Básquet", "Cantidad de Personas en Cancha de Fútbol", "Cantidad de Personas en Cancha de Básquet",
    "Cantidad de Personas en Cancha de Fútbol - Tenis", "Cantidad de Personas en Skate Park", "Cantidad de Personas en Cancha de Mini Fútbol",
    "Cantidad de Personas en Cancha de Vóley", "Cantidad de Personas en Cancha Bochas", "Cantidad de Pista Patinaje",
    "Cantidad de Personas en Parkour", "Cantidad de Metegol", "Cantidad de Ping Pong", "Observaciones",
  ],
  "Posta aerobica": [
    "Cantidad de personas en Caminador Simple", "Cantidad de personas en Fortalecedor de Piernas", "Cantidad de personas en Pedales con remos",
    "Cantidad de personas en Remos", "Cantidad de personas en Bamboleo de Cintura", "Cantidad de personas en Dorsal",
    "Cantidad de personas en Volante", "Cantidad de personas en Espaldar", "Cantidad de personas en Barras",
    "Cantidad de personas en Bancos de Abdominales", "Cantidad de personas en Barra de Extension y Rotacion",
    "Cantidad de personas en Barra de Triceps", "Cantidad de personas en Relajador de Cintura", "Observaciones",
  ],
  Calistenia: ["Cantidad de personas en Calistenia", "Observaciones"],
};

// MAPEO DE IMÁGENES
const imagenesPorPregunta: Record<string, string> = {
  "Cantidad de Personas en Cancha de Fútbol/Básquet": "/Area Deportiva/Futbolbasquet.jpeg",
  "Cantidad de Personas en Cancha de Fútbol": "/Area Deportiva/futbol.jpeg",
  "Cantidad de Personas en Cancha de Básquet": "/Area Deportiva/basquet.jpeg",
  "Cantidad de Personas en Cancha de Fútbol - Tenis": "/Area Deportiva/futboltenis.jpeg",
  "Cantidad de Personas en Skate Park": "/Area Deportiva/skatepark.jpeg",
  "Cantidad de Personas en Cancha de Mini Fútbol": "/Area Deportiva/minifutbol.jpeg",
  "Cantidad de Personas en Cancha de Vóley": "/Area Deportiva/voley.jpeg",
  "Cantidad de Personas en Cancha Bochas": "/Area Deportiva/cancha bochas.jpeg",
  "Cantidad de Pista Patinaje": "/Area Deportiva/pista de patinaje.jpeg",
  "Cantidad de Personas en Parkour": "/Area Deportiva/Parkour.jpeg",
  "Cantidad de Metegol": "/Area Deportiva/metegol.jpg",
  "Cantidad de Ping Pong": "/Area Deportiva/Ping Pong.jpg",
  "Cantidad de Personas en Trepadores": "/Patio de Juego/Trepador.png",
  "Cantidad de Personas en Tobogan": "/Patio de Juego/Tobogan.png",
  "Cantidad de Personas en Resortes": "/Patio de Juego/resortes.png",
  "Cantidad de Personas en Sube y Baja": "/Patio de Juego/subeybaja.png",
  "Cantidad de Personas en Calesitas": "/Patio de Juego/calesita.png",
  "Cantidad de Personas en Paneles": "/Patio de Juego/Paneles.png",
  "Cantidad de Personas en Mangrullo": "/Patio de Juego/mangrullo.png",
  "Cantidad de Personas en Lomada": "/Patio de Juego/lomada.png",
  "Cantidad de Personas en Hamacas": "/Patio de Juego/hamacas.png",
  "Cantidad de personas en Caminador Simple": "/Postas Aerobicas/camsimple.png",
  "Cantidad de personas en Fortalecedor de Piernas": "/Postas Aerobicas/fortdepiernas.png",
  "Cantidad de personas en Pedales con remos": "/Postas Aerobicas/pedremos.png",
  "Cantidad de personas en Remos": "/Postas Aerobicas/remos.png",
  "Cantidad de personas en Bamboleo de Cintura": "/Postas Aerobicas/bamcintura.png",
  "Cantidad de personas en Dorsal": "/Postas Aerobicas/dorsal.png",
  "Cantidad de personas en Volante": "/Postas Aerobicas/volante.png",
  "Cantidad de personas en Espaldar": "/Postas Aerobicas/espalda.png",
  "Cantidad de personas en Barras": "/Postas Aerobicas/barra.png",
  "Cantidad de personas en Bancos de Abdominales": "/Postas Aerobicas/banabdominales.png",
  "Cantidad de personas en Barra de Extension y Rotacion": "/Postas Aerobicas/extrotacion.png",
  "Cantidad de personas en Barra de Triceps": "/Postas Aerobicas/barrtricep.png",
  "Cantidad de personas en Relajador de Cintura": "/Postas Aerobicas/relcintura.png"
};

const agentesOpciones = [
  "ANGELINETTA ADRIEL NICOLAS", "BAEZ ARIEL ALEJANDRO", "BARAGIOLA OSVALDO GERMAN", "BIANCHI SUSANA ANTONIA",
  "BOREIKA SILVIA PATRICIA", "CABRAL DAVID LEANDRO EMANUEL", "CAMPANO LUCAS DAMIAN", "CARDOZO TATIANA MAGALI",
  "CARRO ANALÍA VERÓNICA", "CASARINO SEBASTIAN IGNACIO", "CEJAS ROSA", "CHAMES DUCA NATASHA", "CHAVOL SANTIAGO GABRIEL",
  "CORADINO CHRISTIAN SEBASTIAN", "CORO SANTIAGO", "COTIGNOLA FACUNDO MARTIN", "CRUZ PABLO DANIEL",
  "DA ROCHA MAXIMO ENRIQUE", "D'AQUILA HERNAN NATALIO", "ESPINDOLA GRACIELA ESTHER", "EVANS MARIA SOL",
  "FAILDE CARLOS ALBERTO", "FATALA NOELIA", "FERNANDEZ LETICIA CONCEPCION", "FERRADA GABRIEL OCTAVIO",
  "FLORES NORMA BEATRIZ", "FONTANA ANGEL EZEQUIEL", "GHIOLDI MARIA BELEN", "GIMENEZ MARIA EUGENIA",
  "GOMEZ DAMIAN EZEQUIEL", "GONZALEZ FACUNDO EZEQUIEL", "GONZALEZ YANINA GIMENA", "IBARROLA ARIEL ALEJANDRO",
  "INSAURRALDE NADIA SOLEDAD", "ISAURRALDE ADRIAN SIMON", "KALUTICH MARIA ANDREA", "LAGANA PATRICIO MANUEL",
  "LEDESMA LEONARDO ROBERTO", "LOPEZ HECTOR EMANUEL", "MAFFIOLI MERLINA ELIZABETH", "MAMANI GLORIA",
  "MAMANI NOEMI YOLANDA", "MANCEBO VERONICA ANDREA", "MARTINEZ FERNANDO ARIEL", "MORALES FEDERICO",
  "NOGUERA MIGUEL ANGEL", "OCAMPOS TERESITA DEL VALLE", "OLIVERA MARTIN EZEQUIEL", "PAREDES ROSA ESTHELA",
  "PEREZ CLAUDIO OMAR", "PONTORIERO VALENTIN", "PONZO MATIAS SEBASTIAN", "QUINTANA LAURA RAQUEL",
  "QUINTERO JUAN PABLO", "QUINTEROS JUAN PABLO", "QUIROGA GABRIELA", "RIVERO ALFREDO MANUEL",
  "ROMERO OSVALDO DANIEL", "SABORIDO RODRIGO", "SACCHINELI EMANUEL NICOLAS", "SANCHEZ CACERES GILDA",
  "SANCHEZ CAMILA", "TRASSENS ALEJANDRO DANIEL", "TRASSENS DAMIAN MARTIN", "VALDEZ OJEDA GISELA",
  "VAQUERO DANIELA MARISOL", "VAQUERO KARINA CHANTAL", "VELOZO MARCELA ALEJANDRA", "VIVEROS RAMON ALBERTO",
  "ZARAUZA FERNANDO GABRIEL", "ZOTAYANO GUSTAVO", "ZOTAYANO GUSTAVO DANIEL", "LAGANA GUIDO MARTIN", "LENTI AGUSTIN DANIEL",
];

interface OfertaCargada {
  id: number;
  tipo: string;
  respuestas: Record<string, string>;
}

export default function RelevamientoEspaciosVerdes() {
  const ofertaRef = useRef<HTMLDivElement>(null);

  // ESTADOS
  const [darkMode, setDarkMode] = useState(false);
  const [espaciosPorComuna, setEspaciosPorComuna] = useState<Record<string, string[]>>({});
  const [loadingEspacios, setLoadingEspacios] = useState(true);
  const [errorBackend, setErrorBackend] = useState<string | null>(null);
  const [agente, setAgente] = useState("");
  const [horario, setHorario] = useState("");
  const [comuna, setComuna] = useState("");
  const [espacioVerde, setEspacioVerde] = useState("");
  const [ofertaActual, setOfertaActual] = useState("");
  const [respuestasActuales, setRespuestasActuales] = useState<Record<string, string>>({});
  const [ofertasCargadas, setOfertasCargadas] = useState<OfertaCargada[]>([]);
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [enviandoFormulario, setEnviandoFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(false);
  const [animarSelector, setAnimarSelector] = useState(false);
  const [modalGeneral, setModalGeneral] = useState<{ abierto: boolean; tipo: string; src: string }>({
    abierto: false,
    tipo: "",
    src: "",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("theme", nextMode ? "dark" : "light");
  };

  useEffect(() => {
    async function obtenerEspacios() {
      try {
        const response = await fetch(`${APPS_SCRIPT_URL}?action=espacios`);
        const data = await response.json();
        if (data.error) {
          setErrorBackend(data.error);
        } else {
          setEspaciosPorComuna(data);
        }
      } catch {
        setErrorBackend("Error de comunicación de red con el Apps Script");
      } finally {
        setLoadingEspacios(false);
      }
    }
    obtenerEspacios();
  }, []);

  const resetOferta = (tipo = "") => {
    setOfertaActual(tipo);
    setRespuestasActuales({});
    setErrores({});
    if (!tipo) {
      setTimeout(() => ofertaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  };

  const guardarOferta = () => {
    if (!ofertaActual) return;
    const nuevasErrores: Record<string, boolean> = {};
    preguntas[ofertaActual].forEach((p) => {
      if (p !== "Observaciones" && (respuestasActuales[p] === undefined || respuestasActuales[p] === "")) {
        nuevasErrores[p] = true;
      }
    });

    if (Object.keys(nuevasErrores).length > 0) {
      setErrores(nuevasErrores);
      setErrorValidacion(true);
      setTimeout(() => setErrorValidacion(false), 2500);
      return;
    }

    setOfertasCargadas([...ofertasCargadas, { id: Date.now(), tipo: ofertaActual, respuestas: { ...respuestasActuales } }]);
    resetOferta("");
  };

  async function finalizarRelevamiento() {
    if (ofertasCargadas.length === 0) return;
    setEnviandoFormulario(true);
    try {
      for (const oferta of ofertasCargadas) {
        const respuestasOrdenadas: Record<string, string> = {};
        preguntas[oferta.tipo].forEach((p) => respuestasOrdenadas[p] = oferta.respuestas[p] || "");

        const params = new URLSearchParams({
          action: "guardar",
          datos: JSON.stringify({ agente, horario, comuna, espacioVerde, tipo: oferta.tipo, respuestas: respuestasOrdenadas }),
        });
        await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
      }
      setMensajeExito(true);
      await new Promise((r) => setTimeout(r, 2500));
      setAgente(""); setHorario(""); setComuna(""); setEspacioVerde(""); setOfertasCargadas([]); resetOferta("");
    } catch {
      alert("Error al enviar el formulario. Pruebe otra vez.");
    } finally {
      setEnviandoFormulario(false);
      setMensajeExito(false);
    }
  }

  return (
    <main className={`${montserrat.className} min-h-screen transition-colors duration-500 pb-20 ${
      darkMode ? "bg-[#07111F] text-slate-100" : "bg-[#EDF2F7] text-[#153244]"
    }`}>
      
      <header className={`border-b py-8 px-4 mb-8 text-center transition-colors duration-500 ${
        darkMode ? "bg-[#122033] border-white/5" : "bg-white border-[#153244]/10 shadow-sm"
      }`}>
        <h1 className={`text-3xl md:text-5xl font-black tracking-tighter ${darkMode ? "text-white" : "text-[#153244]"}`}>
          Relevamiento <span className={darkMode ? "text-[#8DE2D6]" : "text-[#153244]"}>de Uso</span>
        </h1>
        <p className={`text-xs font-bold uppercase tracking-[0.2em] mt-2 ${darkMode ? "text-white/40" : "text-[#153244]/60"}`}>Formulario</p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* INTERRUPTOR DE MODO CLARO / OSCURO */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              darkMode
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-[#153244]/10 bg-white text-[#153244] hover:bg-[#F1F5F9] shadow-sm"
            }`}
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
        </div>

        {errorBackend && (
          <div className="bg-red-500/10 border-2 border-red-500/30 p-6 rounded-3xl mb-6 text-red-300 text-sm font-semibold flex items-center gap-4">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-black uppercase text-xs tracking-wider text-red-400">Error en Base de Datos:</p>
              <p>{errorBackend}. Revisá la configuración de macros en tu planilla de Google.</p>
            </div>
          </div>
        )}

        {/* PASO 1 */}
        <section className={`rounded-[32px] p-6 md:p-8 mb-6 border shadow-xl transition-colors duration-500 ${
          darkMode ? "bg-[#122033] border-white/5" : "bg-white border-[#153244]/10"
        }`}>
          <div className="flex items-center gap-4 mb-8">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
              darkMode ? "bg-slate-700 text-slate-200" : "bg-[#153244] text-white"
            }`}>1</span>
            <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#153244]"}`}>Información General</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <CampoSelectConBuscador titulo="Selección de Agente" darkMode={darkMode} value={agente} onChange={setAgente} disabled={ofertasCargadas.length > 0} opciones={agentesOpciones} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CampoSelect titulo="Horario de Relevamiento" darkMode={darkMode} value={horario} onChange={setHorario} disabled={ofertasCargadas.length > 0} opciones={["9:00 hs", "10:00 hs", "11:00 hs", "12:00 hs", "13:00 hs", "14:00 hs", "15:00 hs", "16:00 hs", "17:00 hs", "18:00 hs"]} />
              <CampoSelect titulo="Comuna" darkMode={darkMode} value={comuna} disabled={ofertasCargadas.length > 0 || loadingEspacios || !!errorBackend} isLoading={loadingEspacios} loadingText="⏳ Buscando comunas..." onChange={(v: string) => { setComuna(v); setEspacioVerde(""); }} opciones={Object.keys(espaciosPorComuna)} />
              {comuna && !errorBackend && <CampoSelect titulo="Espacio Verde" darkMode={darkMode} value={espacioVerde} disabled={ofertasCargadas.length > 0} onChange={setEspacioVerde} opciones={espaciosPorComuna[comuna] || []} />}
            </div>
          </div>
        </section>

        {/* PASO 2 */}
        {espacioVerde && agente && horario && (
          <section ref={ofertaRef} className={`rounded-[32px] p-6 md:p-8 mb-6 border transition-all duration-500 shadow-xl ${
            animarSelector 
              ? "border-[#FFCB00] scale-[1.01] ring-4 ring-[#FFCB00]/20" 
              : darkMode ? "bg-[#122033] border-white/5" : "bg-white border-[#153244]/10"
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors duration-500 ${
                animarSelector ? "bg-[#FFCB00] text-[#07111F]" : darkMode ? "bg-slate-700 text-slate-200" : "bg-[#153244] text-white"
              }`}>2</span>
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#153244]"}`}>Seleccione la Oferta a Relevar</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.keys(preguntas).map((tipo) => {
                const btnOfertaStyle = ofertaActual === tipo 
                  ? darkMode 
                    ? "border-[#8DE2D6] bg-[#8DE2D6]/10 text-[#8DE2D6]" 
                    : "border-[#153244] bg-[#153244]/10 text-[#153244]"
                  : animarSelector 
                    ? "border-[#FFCB00]/60 bg-[#FFCB00]/5 text-white animate-pulse" 
                    : darkMode 
                      ? "border-white/10 bg-[#07111F] text-white/60 hover:border-white/20" 
                      : "border-[#153244]/10 bg-[#EDF2F7] text-[#153244]/60 hover:border-[#153244]/20";
                return (
                  <button 
                    key={tipo} 
                    type="button"
                    onClick={() => { setOfertaActual(tipo); setErrores({}); setAnimarSelector(false); }} 
                    className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold h-24 flex items-center justify-center text-center cursor-pointer ${btnOfertaStyle}`}
                  >
                    {tipo}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* PASO 3 */}
        {ofertaActual && (
          <section className={`rounded-[32px] p-6 md:p-8 mb-6 border-2 transition-colors duration-500 shadow-2xl ${
            darkMode ? "bg-[#07111F] border-[#8DE2D6]/30" : "bg-white border-[#153244]"
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="text-center sm:text-left">
                <span className={`text-xs font-black uppercase tracking-widest ${darkMode ? "text-[#8DE2D6]" : "text-[#153244]/60"}`}>Información de:</span>
                <h3 className={`text-3xl font-black mt-1 ${darkMode ? "text-white" : "text-[#153244]"}`}>{ofertaActual}</h3>
              </div>
              <button type="button" onClick={() => resetOferta("")} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">✕ Descartar esta Carga</button>
            </div>

            {/* BOTONES GRANDES DE FOTO EJEMPLO (CANIL / CALISTENIA) */}
            {(ofertaActual === "Canil" || ofertaActual === "Calistenia") && (
              <div className="w-full mb-8">
                <button 
                  type="button" 
                  onClick={() => setModalGeneral({ abierto: true, tipo: ofertaActual, src: ofertaActual === "Canil" ? "/canil.jpg" : "/Calistenia.jpeg" })} 
                  className="w-full py-4 border-2 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md bg-[#FFCB00] border-[#E6B800] text-[#07111F] hover:bg-[#E6B800]"
                >
                  📷 Foto Ejemplo
                </button>
              </div>
            )}

            <div className="space-y-4">
              {preguntas[ofertaActual].map((pregunta) => (
                <div key={pregunta}>
                  {pregunta === "Observaciones" ? (
                    <div className="mt-6">
                      <label className={`block text-xs font-black uppercase mb-2 ml-2 ${darkMode ? "text-white/40" : "text-[#153244]/40"}`}>Comentarios adicionales</label>
                      <textarea 
                        value={respuestasActuales[pregunta] || ""} 
                        onChange={(e) => setRespuestasActuales({ ...respuestasActuales, [pregunta]: e.target.value })} 
                        placeholder="Escribí acá si notaste algo raro..." 
                        className={`w-full rounded-2xl border p-5 outline-none transition-all ${
                          darkMode ? "bg-[#122033] border-white/10 text-white focus:border-[#8DE2D6]" : "bg-[#F8FAFC] border-[#153244]/10 text-[#153244] focus:border-[#153244]"
                        }`} 
                        rows={3} 
                      />
                    </div>
                  ) : (
                    <ControlCantidad titulo={pregunta} darkMode={darkMode} error={errores[pregunta]} value={respuestasActuales[pregunta]} imagenEjemplo={imagenesPorPregunta[pregunta]} ocultarBotonNoTiene={ofertaActual === "Canil" || ofertaActual === "Calistenia"} onChange={(val: string) => { setRespuestasActuales({ ...respuestasActuales, [pregunta]: val }); setErrores({ ...errores, [pregunta]: false }); }} />
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={guardarOferta} className={`w-full mt-12 py-6 rounded-3xl text-xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer ${
              darkMode ? "bg-[#8DE2D6] text-[#07111F]" : "bg-[#153244] text-white"
            }`}>Guardar Oferta ✓</button>
          </section>
        )}

        {/* RESUMEN DE COLA */}
        {ofertasCargadas.length > 0 && !ofertaActual && (
          <div className="mt-12 bg-white/5 rounded-[32px] p-1 border border-white/10 shadow-xl">
            <div className={`rounded-[30px] p-6 md:p-8 ${darkMode ? "bg-[#122033]" : "bg-white"}`}>
              <h3 className={`text-2xl font-black mb-6 ${darkMode ? "text-white" : "text-[#153244]"}`}>📋 Listas para enviar ({ofertasCargadas.length})</h3>
              <div className="space-y-3 mb-6">
                {ofertasCargadas.map((o, i) => (
                  <div key={o.id} className={`flex items-center justify-between p-5 rounded-2xl border gap-4 ${
                    darkMode ? "bg-[#07111F] border-white/5" : "bg-[#F8FAFC] border-[#153244]/10"
                  }`}>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => { setOfertaActual(o.tipo); setRespuestasActuales(o.respuestas); setOfertasCargadas(ofertasCargadas.filter((item) => item.id !== o.id)); }} className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold cursor-pointer ${
                        darkMode ? "bg-[#8DE2D6]/10 border-[#8DE2D6]/30 text-[#8DE2D6]" : "bg-[#153244]/10 border-[#153244]/30 text-[#153244]"
                      }`}>✎</button>
                      <div>
                        <span className={`text-xs font-black block ${darkMode ? "text-slate-400" : "text-[#153244]/60"}`}>OFERTA {i + 1}</span>
                        <span className={`font-bold text-lg ${darkMode ? "text-white" : "text-[#153244]"}`}>{o.tipo}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => setOfertasCargadas(ofertasCargadas.filter((item) => item.id !== o.id))} className="text-red-400/80 font-bold text-sm px-4 py-2 hover:bg-red-500/10 rounded-xl cursor-pointer">Eliminar</button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => resetOferta("")} className={`w-full mb-4 border py-4 rounded-[20px] font-bold cursor-pointer flex items-center justify-center gap-2 ${
                darkMode ? "bg-white/5 border-white/10 text-slate-200" : "bg-[#F1F5F9] border-[#153244]/10 text-[#153244]"
              }`}><span>➕</span> Añadir otra Oferta</button>
              <button type="button" onClick={finalizarRelevamiento} className="w-full bg-[#FFCB00] text-[#07111F] py-6 rounded-[24px] text-2xl font-black hover:scale-105 active:scale-95 transition-all cursor-pointer">Enviar Formulario</button>
            </div>
          </div>
        )}
      </div>

      {/* POPUPS Y PANTALLAS DE CARGA */}
      {enviandoFormulario && (
        <div className="fixed inset-0 z-[110] bg-[#07111F]/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className={`p-12 rounded-[50px] border text-center max-w-sm w-full ${darkMode ? "bg-[#122033] border-white/10" : "bg-white border-[#153244]/10"}`}>
            {!mensajeExito ? (
              <>
                <div className="flex justify-center mb-8"><div className={`w-20 h-20 border-8 border-white/10 rounded-full animate-spin ${darkMode ? "border-t-[#8DE2D6]" : "border-t-[#153244]"}`}></div></div>
                <h2 className={`text-3xl font-black mb-2 uppercase ${darkMode ? "text-white" : "text-[#153244]"}`}>Enviando</h2>
                <p className={darkMode ? "text-slate-400" : "text-[#475569]"}>No cierres la página...</p>
              </>
            ) : (
              <>
                <div className="text-8xl mb-6 animate-bounce">✅</div>
                <h2 className={`text-3xl font-black mb-2 uppercase ${darkMode ? "text-white" : "text-[#153244]"}`}>¡Recibido!</h2>
                <p className={`font-bold uppercase tracking-widest text-xs ${darkMode ? "text-[#8DE2D6]" : "text-[#153244]"}`}>Carga completada con éxito</p>
              </>
            )}
          </div>
        </div>
      )}

      {errorValidacion && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-md">
          <div className="bg-red-600 text-white p-5 rounded-3xl shadow-2xl font-black text-center flex items-center justify-center gap-4 border-4 border-red-400 animate-in slide-up-from-bottom">
            <span className="text-3xl">⚠️</span><span className="text-sm">¡Atención! Te faltó completar algunas preguntas.</span>
          </div>
        </div>
      )}

      {/* MODAL GENERAL PARA CANIL Y CALISTENIA */}
      {modalGeneral.abierto && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`rounded-3xl border p-4 max-w-lg w-full shadow-2xl relative ${darkMode ? "bg-[#122033] border-white/10" : "bg-white border-[#153244]/10"}`}>
            <div className="flex items-center justify-between mb-3 px-2">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-[#153244]/60"}`}>Foto de Referencia: {modalGeneral.tipo}</h4>
              <button type="button" onClick={() => setModalGeneral({ abierto: false, tipo: "", src: "" })} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black cursor-pointer ${darkMode ? "bg-white/5 text-white" : "bg-slate-200 text-[#153244]"}`}>✕</button>
            </div>
            <div className="bg-[#07111F] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center max-h-[70vh]">
              <img src={modalGeneral.src} alt={modalGeneral.tipo} className="w-full h-auto object-contain max-h-[65vh]" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

interface CampoSelectConBuscadorProps {
  titulo: string;
  value: string;
  onChange: (val: string) => void;
  opciones: string[];
  disabled?: boolean;
  darkMode: boolean;
}

function CampoSelectConBuscador({ titulo, value, onChange, opciones, disabled, darkMode }: CampoSelectConBuscadorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectColorClass = value 
    ? darkMode ? "border-[#8DE2D6]/40 text-white" : "border-[#153244]/40 text-[#153244]"
    : darkMode ? "border-white/10 text-white/40 bg-[#07111F]" : "border-[#153244]/10 text-[#153244]/40 bg-[#F8FAFC]";

  return (
    <div className="flex flex-col relative" ref={containerRef}>
      <label className={`text-[10px] uppercase font-black tracking-widest mb-2 ml-2 ${darkMode ? "text-white/40" : "text-[#153244]/40"}`}>{titulo}</label>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)} 
        className={`w-full rounded-2xl px-5 py-5 border-2 transition-all font-bold flex justify-between items-center select-none ${selectColorClass} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span>{value || "Buscar y seleccionar Agente..."}</span>
        <span className={`opacity-30 text-xl ${darkMode ? "text-white" : "text-[#153244]"}`}>▼</span>
      </div>
      {isOpen && (
        <div className={`absolute top-[102%] left-0 w-full border-2 rounded-2xl shadow-2xl z-[100] p-3 mt-1 ${
          darkMode ? "bg-[#121926] border-slate-700" : "bg-white border-[#CBD5E1]"
        }`}>
          <input 
            type="text" 
            placeholder="Escribí para buscar agente..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
            className={`w-full border rounded-xl px-4 py-3 font-bold text-sm outline-none mb-2 ${
              darkMode ? "bg-[#07111F] text-white border-white/10 focus:border-[#8DE2D6]" : "bg-[#F8FAFC] text-[#153244] border-[#CBD5E1] focus:border-[#153244]"
            }`} 
            autoFocus
          />
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {opciones.filter((o: string) => o.toLowerCase().includes(busqueda.toLowerCase())).map((opcion: string) => {
              const activeOptionStyle = value === opcion 
                ? darkMode ? "bg-[#8DE2D6]/20 text-[#8DE2D6]" : "bg-[#153244]/20 text-[#153244]"
                : darkMode ? "text-white/80 hover:bg-white/5" : "text-[#153244]/80 hover:bg-[#F1F5F9]";
              return (
                <div 
                  key={opcion} 
                  onClick={() => { onChange(opcion); setIsOpen(false); setBusqueda(""); }} 
                  className={`px-4 py-3 rounded-xl text-sm font-bold cursor-pointer transition-all ${activeOptionStyle}`}
                >
                  {opcion}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface CampoSelectProps {
  titulo: string;
  value: string;
  onChange: (val: string) => void;
  opciones: string[];
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  darkMode: boolean;
}

function CampoSelect({ titulo, value, onChange, opciones, disabled, isLoading, loadingText, darkMode }: CampoSelectProps) {
  const selectStyle = value 
    ? darkMode ? "border-[#8DE2D6]/40 text-white bg-[#07111F]" : "border-[#153244]/40 text-[#153244] bg-white"
    : darkMode ? "border-white/10 text-white/40 bg-[#07111F]" : "border-[#153244]/10 text-[#153244]/40 bg-[#F8FAFC]";

  return (
    <div className="flex flex-col">
      <label className={`text-[10px] uppercase font-black tracking-widest mb-2 ml-2 ${darkMode ? "text-white/40" : "text-[#153244]/40"}`}>{titulo}</label>
      <div className="relative">
        <select 
          value={value} 
          disabled={disabled || isLoading} 
          onChange={(e) => onChange(e.target.value)} 
          className={`w-full rounded-2xl px-5 py-5 border-2 transition-all outline-none appearance-none font-bold ${selectStyle} ${isLoading ? "border-[#FFCB00]/30 text-[#FFCB00]/70 animate-pulse" : ""} ${disabled && !isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isLoading ? <option value="">{loadingText}</option> : <><option value="">Seleccionar...</option>{opciones.map((o: string) => <option key={o} value={o} className={darkMode ? "bg-[#121926]" : "bg-white text-[#153244]"}>{o}</option>)}</>}
        </select>
        <div className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-xl ${darkMode ? "text-white" : "text-[#153244]"}`}>▼</div>
      </div>
    </div>
  );
}

interface ControlCantidadProps {
  titulo: string;
  value: string | undefined;
  onChange: (val: string) => void;
  error?: boolean;
  ocultarBotonNoTiene?: boolean;
  imagenEjemplo?: string;
  darkMode: boolean;
}

function ControlCantidad({ titulo, value, onChange, error, ocultarBotonNoTiene, imagenEjemplo, darkMode }: ControlCantidadProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const num = value === "No Tiene" ? -1 : (value === "" || value === undefined ? null : parseInt(value));

  const ajustar = (delta: number) => {
    const actual = num === null || num === -1 ? 0 : num;
    onChange(String(Math.max(0, Math.min(50, actual + delta))));
  };

  const containerStyle = error 
    ? "border-red-500 bg-red-500/5" 
    : num !== null 
      ? darkMode ? "border-[#8DE2D6]/40 bg-[#8DE2D6]/5" : "border-[#153244]/40 bg-[#153244]/5"
      : darkMode ? "border-white/5 bg-[#122033]" : "border-[#153244]/10 bg-[#F8FAFC]";

  const btnStyle = darkMode 
    ? "bg-[#07111F] border-white/10 text-white" 
    : "bg-white border-[#153244]/20 text-[#153244]";

  const spanStyle = num === -1 
    ? "text-slate-500 text-xl" 
    : darkMode ? "text-white" : "text-[#153244]";

  return (
    <div className={`p-4 md:p-6 rounded-[24px] border-2 transition-all ${containerStyle}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="hidden sm:block w-28"></div>
        <label className={`block text-sm font-bold text-center ${darkMode ? "text-slate-300" : "text-[#153244]"}`}>{titulo}</label>
        <div className="w-auto sm:w-28 flex justify-center sm:justify-end">
          {imagenEjemplo && (
            <button 
              type="button" 
              onClick={() => setModalAbierto(true)} 
              className="px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer bg-[#FFCB00] border border-[#E6B800] text-[#07111F] hover:bg-[#E6B800] shadow-sm"
            >
              📷 Foto Ejemplo
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between max-w-[280px] mx-auto gap-4">
        <button type="button" onClick={() => num === 0 ? (!ocultarBotonNoTiene ? onChange("No Tiene") : null) : ajustar(-1)} className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl font-black cursor-pointer ${btnStyle}`}>-</button>
        <div className="flex-1 text-center">
          <span className={`text-3xl font-black ${spanStyle}`}>
            {num === -1 ? "No tiene" : num === null ? "?" : num}
          </span>
        </div>
        <button type="button" onClick={() => ajustar(1)} className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl font-black cursor-pointer ${btnStyle}`}>\+</button>
      </div>

      {!ocultarBotonNoTiene && (
        <div className="flex justify-center mt-4">
          <button type="button" onClick={() => onChange("No Tiene")} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${num === -1 ? "bg-white/20 text-white" : "bg-white/5 text-slate-500"}`}>No tiene</button>
        </div>
      )}

      {modalAbierto && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`rounded-3xl border p-4 max-w-lg w-full relative ${darkMode ? "bg-[#122033] border-white/10" : "bg-white border-[#153244]/10"}`}>
            <div className="flex items-center justify-between mb-3 px-2">
              <h4 className={`text-xs font-bold uppercase tracking-wider truncate max-w-[85%] ${darkMode ? "text-slate-400" : "text-[#153244]/60"}`}>{titulo}</h4>
              <button type="button" onClick={() => setModalAbierto(false)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black cursor-pointer ${darkMode ? "bg-white/5 text-white" : "bg-slate-200 text-[#153244]"}`}>✕</button>
            </div>
            <div className="bg-[#07111F] rounded-2xl overflow-hidden flex items-center justify-center max-h-[70vh]">
              <img src={imagenEjemplo} alt={titulo} className="w-full h-auto object-contain max-h-[65vh]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

