// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function base64urlToBytes (b64: string): Uint8Array {
  return Uint8Array.from(atob(b64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
}

export function base64ToBytes (b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

export function bytesToBase64 (a: Uint8Array | number[]): string {
  return btoa(String.fromCharCode(...a))
}

export function bytesToBase64url (a: Uint8Array | number[]): string {
  return btoa(String.fromCharCode(...a)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export function stringToBytes (s: string): Uint8Array {
  return new TextEncoder().encode(s)
}

export function bytesToString (a: Uint8Array): string {
  return new TextDecoder().decode(a)
}
