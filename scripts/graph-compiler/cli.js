#!/usr/bin/env node
'use strict';

const { Config    } = require('./config');
const { Schema    } = require('./schema');
const { Subgraph  } = require('./subgraph');
const { writeFile } = require('./utils');

const argv = require('yargs')
  .env()
  .option('config',          { type: 'string',  required: true                                        })
  .option('common-types',    { type: 'string',  default: '@amxx/graphprotocol-utils/common/schema.js' })
  .option('include',         { type: 'array',   default: []                                           })
  .option('export-schema',   { type: 'boolean', default: false                                        })
  .option('export-subgraph', { type: 'boolean', default: false                                        })
  .option('root',            { type: 'string',  default: '.' })
  .argv;

const config = new Config(argv);

if (argv.exportSchema) {
  writeFile(config.schemaPath(), Schema.fromConfig(config).toString());
  console.log(`- Schema exported to ${config.schemaPath()}`)
}

if (argv.exportSubgraph) {
  writeFile(config.subgraphPath(), Subgraph.fromConfig(config).toString());
  console.log(`- Manifest exported to ${config.subgraphPath()}`)
}
