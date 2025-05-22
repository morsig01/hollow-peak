import { type SchemaTypeDefinition } from 'sanity'
import member from './member'
import event from './event'
import release from './release'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, event, release],
}
