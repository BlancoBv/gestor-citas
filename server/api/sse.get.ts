export default defineEventHandler((event) => {
  const { hooks } = useNitroApp();
  // Establecer el encabezado para SSE
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");

  // Crear un flujo de eventos
  const stream = event.node.res;
  stream.write("event: nueva_conexion\n");
  stream.write(
    `data: ${JSON.stringify({
      message: "Conexion recibida",
      timestamp: new Date(),
    })}\n\n`
  );
  // Enviar eventos cada 2 segundos
  const interval = setInterval(() => {
    stream.write(`event: tilin\n`);
    stream.write(
      `data: ${JSON.stringify({
        message: "Hola desde SSE",
        timestamp: new Date(),
      })}\n\n`
    );
  }, 2000);

  const sendEvent = (data: { msg: { time: Date }; event: string }) => {
    const events: { [key: string]: string } = {
      citaActualizada: "event: citaActualizada\n",
    };
    stream.write(events[data.event]);
    stream.write(`data: ${JSON.stringify(data.msg)}\n\n`);
  };

  hooks.hook("sse:event", sendEvent);
  // Cerrar la conexión cuando el cliente se desconecte
  event.node.req.on("close", () => {
    clearInterval(interval);
    stream.end();
  });
});
