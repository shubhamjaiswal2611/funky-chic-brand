import { useActor } from "@caffeineai/core-infrastructure";
import { type ExternalBlob, createActor } from "../backend";
import type { LoreDrop, backendInterface } from "../backend.d";

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

export async function getLoreDrop(
  actor: backendInterface,
): Promise<LoreDrop | null> {
  const result = await actor.getLoreDrop();
  if (Array.isArray(result) && result.length === 0) return null;
  return result as LoreDrop;
}

export async function setLoreDrop(
  actor: backendInterface,
  targetMs: number,
  title: string,
): Promise<void> {
  const targetNs = BigInt(targetMs) * BigInt(1_000_000);
  await actor.setLoreDrop(targetNs, title);
}
