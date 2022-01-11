const path = require('path');

class Config {
  constructor(argv) {
    module.paths.unshift(
      path.resolve('.'),
      ...argv.include.map(folder => path.resolve(folder))
    );

    this.require = require;
    this._cfg    = require(argv.config);
    this._argv   = argv;
  }

  modules() {
    return this._cfg.datasources.flatMap(({ module, templates }) => [].concat(module, templates)).filter(Boolean).unique();
  }

  datasources() {
    return this._cfg.datasources;
  }

  templates() {
    return this._cfg.datasources.flatMap(({ templates }) => templates).filter(Boolean).unique();
  }

  root() {
    return this._argv.root;
  }

  schemaPath()   { return `${this._cfg.output}schema.graphql`; }
  subgraphPath() { return `${this._cfg.output}subgraph.yaml`;  }
}

module.exports = {
  Config,
};
