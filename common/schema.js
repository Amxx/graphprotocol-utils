const path = require('path');

module.exports = [
  '../src/account.gql.json',
  '../src/decimals.gql.json',
  '../src/events.gql.json',
  '../src/transactions.gql.json',
  '../src/persistent/string.gql.json',
  '../src/persistent/stringarray.gql.json',
].flatMap(name => require(path.resolve(__dirname, name)));
