export default defineEventHandler((event) => {
  const { hooks } = useNitroApp();
  hooks.callHook("sse:event", {
    msg: { time: new Date() },
    event: "citaActualizada",
  });
  return { msg: "xd" };
});
