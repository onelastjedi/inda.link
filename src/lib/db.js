import { query, Client } from 'faunadb'

export const q = query
export const db = new Client({
  secret: process.env.FAUNADB_PUBLIC_KEY
})
