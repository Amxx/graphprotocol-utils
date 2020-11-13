import {
	log,
} from '@graphprotocol/graph-ts'

import {
	NewContract as NewContractEvent
} from '../generated/GenericFactory/GenericFactory'

import {
	constants,
	decimals,
	event,
	persistent,
	transaction,
} from '../src'

export function handleNewContract(ev: NewContractEvent): void {
	let tx: transaction.Tx = transaction.log(ev);
	let id: string         = event.id(ev);
	let fees               = decimals.toDecimals(ev.transaction.gasPrice*ev.transaction.gasUsed)
	// persistent


	log.warning("tx: {}, id: {}, fees: {}", [ tx.id, id, fees.toString() ])
}
