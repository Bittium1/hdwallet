import * as core from "@shapeshiftoss/hdwallet-core";

import { BIP32, Ed25519, Revocable } from "..";
import * as SecP256K1 from "../secp256k1";
import { ChainCode } from ".";

export interface Seed extends Partial<Revocable> {
  toSecp256k1MasterKey(): Promise<BIP32.Node>;
  toEd25519MasterKey(): Promise<Ed25519.Node>;
}

export interface Node extends Partial<Revocable>, SecP256K1.ECDSAKey, Partial<SecP256K1.ECDHKey> {
  readonly explicitPath?: string;
  getPublicKey(): Promise<SecP256K1.CompressedPoint>;
  getChainCode(): Promise<ChainCode>;
  derive(index: number): Promise<this>;
}

export function nodeSupportsECDH<T extends Node>(x: T): x is T & SecP256K1.ECDHKey {
  return core.isIndexable(x) && "ecdh" in x && typeof x.ecdh === "function";
}
