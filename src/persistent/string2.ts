import {
	store,
} from '@graphprotocol/graph-ts'

import {
	PersistentString,
} from '../../generated/schema'

export class String2 {
	_id:     string;
	_buffer: PersistentString | null;

	constructor(id: string) {
		this._id     = id;
		this._buffer = null;
	}

	load(): PersistentString | null {
		if (this._buffer) return this._buffer;
		this._buffer = PersistentString.load(this._id);
		if (this._buffer) return this._buffer;
		this._buffer = new PersistentString(this._id);
		return this._buffer;
	}

	get(): string {
		this.load();
		return this._buffer.value;
	}

	set(value: string): void {
		this.load()
		this._buffer!.value = value;
		this._buffer!.save();
	}

	del(): void {
		store.remove('PersistentString', id);
		this._buffer = null;
	}

	get id(): string {
		return this._id;
	}
}
