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
		_entry: DecimalValue

		constructor(id: string, decimal: i32 = decimals.DEFAULT_DECIMALS) {
			let entry = DecimalValue.load(id)
			if (entry == null) {
				this._entry          = new DecimalValue(id)
				this._entry.exact    = constants.BIGINT_ZERO
				this._entry.decimals = decimal
				this.update()
			} else {
				this._entry = entry as DecimalValue
			}
		}

		update() : void {
			this._entry.value = decimals.toDecimals(this._entry.exact, this._entry.decimals)
			this._entry.save()
		}

		set(exact: BigInt): Value {
			this._entry.exact = exact
			this.update()
			return this
		}

		increment(delta: BigInt): Value {
			this._entry.exact = integers.increment(this._entry.exact, delta)
			this.update()
			return this
		}

		decrement(delta: BigInt): Value {
			this._entry.exact = integers.decrement(this._entry.exact, delta)
			this.update()
			return this
		}
	}
}
