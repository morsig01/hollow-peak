import { type SchemaTypeDefinition } from 'sanity'
import member from './member'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member],
}
