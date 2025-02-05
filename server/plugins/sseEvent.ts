export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.addHooks("sse:event");
});
