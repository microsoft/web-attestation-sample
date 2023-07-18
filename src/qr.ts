// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Encoder, Decoder, ErrorCorrectionLevel, QRByte } from '@nuintun/qrcode'
import { type DecodeResult } from '@nuintun/qrcode/types/qrcode/decoder/decoder'
import { base64urlToBytes } from './utils'

export function decode (data: Uint8ClampedArray, width: number, height: number): DecodeResult | null {
  const decoder = new Decoder()
  return decoder.decode(data, width, height)
}

export function encode (uwa: string): string {
  const qrcode = new Encoder()

  qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M)

  const parts = uwa.replace('uwa://', '').split('.')

  qrcode.write('uwa://')
  parts.forEach((part) => {
    qrcode.write(
      new QRByte(part, (p) => {
        return {
          bytes: Array.from(base64urlToBytes(p)),
          encoding: 1
        }
      })
    )
  })

  qrcode.make()
  return qrcode.toDataURL()
}
