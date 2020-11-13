import {
	store,
} from '@graphprotocol/graph-ts'

import {
	PersistentString,
} from '../../generated/schema'

export class String {
	static set(id: string, value: string): void {
		let buffer   = new PersistentString(id)
		buffer.value = value
		buffer.save()
	}

	static get(id: string): string {
		let buffer = PersistentString.load(id)
		return buffer == null ? null : buffer.value
	}

	static del(id: string): void {
		store.remove('PersistentString', id)
	}
}
