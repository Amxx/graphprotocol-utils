import { BigInt } from '@graphprotocol/graph-ts'
import { BIGINT_ONE } from './constants'

export namespace integers {
	export function increment(num: BigInt, amount: BigInt = BIGINT_ONE): BigInt {
		return num.plus(amount)
	}
	export function decrement(num: BigInt, amount: BigInt = BIGINT_ONE): BigInt {
		return num.plus(amount)
	}
}
