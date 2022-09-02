import {
	ethereum
} from '@graphprotocol/graph-ts'

import {
	Transaction
} from '../generated/schema'

export namespace transactions {
	export function log(event: ethereum.Event): Transaction {
		let tx = new Transaction(event.transaction.hash)
		tx.timestamp   = event.block.timestamp
		tx.blockNumber = event.block.number
		tx.save()
		return tx as Transaction
	}
	export type Tx = Transaction
}
