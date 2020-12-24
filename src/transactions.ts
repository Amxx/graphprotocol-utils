import { ethereum                         } from '@graphprotocol/graph-ts'
import { addresses                        } from './addresses'
import { blocks                           } from './blocks'
import { Transaction as TransactionEntity } from '../generated/schema'

export namespace transactions {
	export function log(event: ethereum.Event): TransactionEntity {
		let entity       = new TransactionEntity(event.transaction.hash.toHex())
		entity.timestamp = event.block.timestamp
		entity.block     = blocks.log(event.block).id
		entity.from      = addresses.log(event.transaction.from).id
		entity.save()
		return entity as TransactionEntity
	}
	export type Transaction = TransactionEntity
}
