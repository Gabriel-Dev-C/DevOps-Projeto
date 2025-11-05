import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'troque-esta-chave'

export function signPayload(payload: object, expiresIn: SignOptions['expiresIn'] = '8h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as any
}
