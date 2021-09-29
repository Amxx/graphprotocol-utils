import {
	store,
} from '@graphprotocol/graph-ts'

import {
	PersistentStringArray,
} from '../../generated/schema'

export class StringArray2 {
	_id:     string;
	_buffer: PersistentStringArray | null;

	constructor(id: string) {
		this._id     = id;
		this._buffer = null;
	}

	load(): PersistentStringArray | null {
		if (this._buffer) return this._buffer;
		this._buffer = PersistentStringArray.load(this._id);
		if (this._buffer) return this._buffer;
		this._buffer = new PersistentStringArray(this._id);
		this._buffer!.values = [];
		return this._buffer;
	}

	pushBack(value: string) : void {
		this.load()
		let array = this._buffer!.values
		array.push(value)
		this._buffer!.values = array
		this._buffer!.save()
	}

	pushFront(value: string) : void {
		this.load()
		let array = this._buffer!.values
		array.unshift(value)
		this._buffer!.values = array
		this._buffer!.save()
	}

	popBack() : string {
		this.load()
		if (this._buffer == null) {
			return null
		}
		let array = this._buffer.values
		if (array.length == 0) {
			return null
		}
		let value  = array.pop()
		this._buffer.values = array
		this._buffer.save()
		return value
	}

	popFront() : string {
		this.load()
		if (this._buffer == null) {
			return null
		}
		let array = this._buffer.values
		if (array.length == 0) {
			return null
		}
		let value  = array.shift()
		this._buffer.values = array
		this._buffer.save()
		return value
	}

	length() : i32 {
		this.load()
		return this._buffer.values.length
	}

	del(): void {
		store.remove('PersistentStringArray', id);
		this._buffer = null;
	}

	get id(): string {
		return this._id;
	}
}
