import {
	ethereum,
} from '@graphprotocol/graph-ts'

import {
	Transaction,
	TransactionSender,
} from '../generated/schema'

export namespace transactions {
	export function log(event: ethereum.Event): Transaction {
		let from = new TransactionSender(event.transaction.from.toHex())
		from.save()
		let tx = new Transaction(event.transaction.hash.toHex())
		tx.timestamp   = event.block.timestamp
		tx.blockNumber = event.block.number
		tx.from        = from.id
		tx.save()
		return tx as Transaction
	}
	export type Tx = Transaction
}
