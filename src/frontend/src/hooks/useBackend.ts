import { useActor } from "@caffeineai/core-infrastructure";
import { type ExternalBlob, createActor } from "../backend";
import type { backendInterface } from "../backend.d";

function backendCreateActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (file: Uint8Array) => Promise<ExternalBlob>,
) {
  return createActor(canisterId, uploadFile, downloadFile);
}

export function useBackend() {
  return useActor<backendInterface>(backendCreateActor);
}
