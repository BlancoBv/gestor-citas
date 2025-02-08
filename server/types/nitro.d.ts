import type { NitroApp } from "nitropack/types";

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "sse:event": (data: { msg: { time: Date }; event: string }) => void;
  }
}
