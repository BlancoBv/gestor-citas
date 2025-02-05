import type { NitroApp } from "nitropack/types";

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "sse:event": (data: any) => void;
  }
}
