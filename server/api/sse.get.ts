/* export default defineEventHandler(async (event) => {
  if (!process.dev) return { disabled: true };

  // Enable SSE endpoint
  setHeader(event, "cache-control", "no-cache");
  setHeader(event, "connection", "keep-alive");
  setHeader(event, "content-type", "text/event-stream");
  setResponseStatus(event, 200);

  let counter = 0;

  const sendEvent = (data: any) => {
    event.node.res.write(`id: ${++counter}\n`);
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  //myHooks.hook("sse:event", sendEvent);

  // Let the connection opened
  event._handled = true;
}); */
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
