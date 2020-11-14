import {
	store,
} from '@graphprotocol/graph-ts'

import {
	PersistentStringArray,
} from '../../generated/schema'

export class StringArray {
	static pushBack(id: string, value: string) : void {
		let buffer = PersistentStringArray.load(id)
		if (buffer == null) {
			buffer        = new PersistentStringArray(id)
			buffer.values = []
		}
		let array = buffer.values
		array.push(value)
		buffer.values = array
		buffer.save()
	}

	static pushFront(id: string, value: string) : void {
		let buffer = PersistentStringArray.load(id)
		if (buffer == null) {
			buffer        = new PersistentStringArray(id)
			buffer.values = []
		}
		let array = buffer.values
		array.unshift(value)
		buffer.values = array
		buffer.save()
	}

	static popBack(id: string) : string {
		let buffer = PersistentStringArray.load(id)
		if (buffer == null) {
			return null
		}
		let array = buffer.values
		if (array.length == 0) {
			return null
		}
		let value  = array.pop()
		buffer.values = array
		buffer.save()
		return value
	}

	static popFront(id: string) : string {
		let buffer = PersistentStringArray.load(id)
		if (buffer == null)
		{
			return null
		}
		let array = buffer.values
		if (array.length == 0) {
			return null
		}
		let value  = array.shift()
		buffer.values = array
		buffer.save()
		return value
	}

	static length(id: string) : i32 {
		let buffer = ArrayBuffer.load(id)
		return buffer == null ? 0 : buffer.values.length
	}

	static del(id: string): void {
		store.remove('PersistentStringArray', id)
	}
}
