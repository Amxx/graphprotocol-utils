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
	log.warning("tx: {}, id: {}, fees: {}", [ tx.id, id, fees.toString() ])

	persistent.string.set("Key", "Value")
	persistent.stringarray.pushBack("Key", "Value1")
	persistent.stringarray.pushFront("Key", "Value2")
	persistent.stringarray.pushBack("Key", "Value3")
}
