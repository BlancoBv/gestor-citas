export default defineEventHandler(async (event) => {
  const { hooks } = useNitroApp();
  const body = await readBody(event);

  hooks.callHook("sse:event", { msg: "eso tilin", timestamp: new Date() });
});
