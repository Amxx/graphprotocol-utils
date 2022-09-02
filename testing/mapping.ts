import {
	log,
} from '@graphprotocol/graph-ts'

import {
	NewContract as NewContractEvent
} from '../generated/GenericFactory/GenericFactory'

import {
	constants,
	decimals,
	events,
	integers,
	persistent,
	transactions,
} from '../src'

export function handleNewContract(ev: NewContractEvent): void {
	let tx   = transactions.log(ev);
	let id   = events.id(ev);
	let fees = decimals.toDecimals(ev.transaction.gasPrice.times(ev.transaction.gasLimit))
	log.warning("tx: {}, id: {}, fees: {}", [ tx.id, id, fees.toString() ])

	let i = constants.BIGINT_ONE
	i = integers.increment(i)
	i = integers.decrement(i)

	let d = new decimals.Value("mydecimalvalue", 9)
	d.increment(constants.BIGINT_ONE)
	let did = d.id

	persistent.string.set("Key", "Value")
	persistent.stringarray.pushBack("Key", "Value1")
	persistent.stringarray.pushFront("Key", "Value2")
	persistent.stringarray.pushBack("Key", "Value3")

	let s = new persistent.STRING("OtherKey")
	s.set("OtherValue")
	let sid = s.id

	let sa = new persistent.STRINGARRAY("OtherKey")
	sa.pushBack("Value1")
	sa.pushFront("Value2")
	sa.pushBack("Value3")
	let said = sa.id
}
