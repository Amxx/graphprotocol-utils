const SchemaEntry = require('./schema_entry');

class Schema extends Array {
  static fromConfig(cfg) {
    const entries = cfg.modules()
      .flatMap(module => cfg.require(`${module}.gql.json`))
      .map(SchemaEntry.from);

    const commons = (cfg._argv.commonTypes ? cfg.require(cfg._argv.commonTypes) : [])
        .filter(({ name }) => entries.some(({ parent, fields }) => parent == name || fields.map(({ type }) => type.replace(/[\[\]\!]/, '')).includes(name)))
        .map(SchemaEntry.from);

    return Schema.from([].concat(entries, commons)).sanitize();
  }

  sanitize() {
    return Schema.from(
      this
        .map(({ name }) => name)
        .unique()
        .map(name => this.filter(entry => name === entry.name).reduce(SchemaEntry.merge, {})),
    );
  }

  toString() {
    return this.join('');
  }
}

module.exports = Schema;
