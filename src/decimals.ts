import {
	BigDecimal,
	BigInt
} from '@graphprotocol/graph-ts'

import {
	DecimalValue,
} from '../generated/schema'

import {
	constants
} from './constants'

import {
	integers
} from './integers'

export namespace decimals {
	export const DEFAULT_DECIMALS = 18
	export function toDecimals(value: BigInt, decimals: number = DEFAULT_DECIMALS): BigDecimal {
		let precision = BigInt.fromI32(10).pow(<u8>decimals).toBigDecimal()
		return value.divDecimal(precision)
	}

	export class Value {
		_entry!: DecimalValue;

		constructor(id: string, decimal: i32 = decimals.DEFAULT_DECIMALS) {
			let entry = DecimalValue.load(id)
			if (entry == null) {
				this._entry          = new DecimalValue(id)
				this._entry.exact    = constants.BIGINT_ZERO
				this._entry.decimals = decimal
				this._update()
			} else {
				this._entry = entry
			}
		}

		static fetch(id: string, decimal: i32 = decimals.DEFAULT_DECIMALS): Value {
			return new Value(id, decimal)
		}

		get id(): string {
			return this._entry.id;
		}

		get exact() : BigInt {
			return this._entry.exact;
		}

		get value() : BigDecimal {
			return this._entry.value;
		}

		get decimals() : i32 {
			return this._entry.decimals;
		}

		set(exact: BigInt): Value {
			this._entry.exact = exact
			this._update()
			return this
		}

		increment(delta: BigInt): Value {
			this._entry.exact = integers.increment(this._entry.exact, delta)
			this._update()
			return this
		}

		decrement(delta: BigInt): Value {
			this._entry.exact = integers.decrement(this._entry.exact, delta)
			this._update()
			return this
		}

		_update() : void {
			this._entry.value = decimals.toDecimals(this._entry.exact, this._entry.decimals)
			this._entry.save()
		}
	}
}
