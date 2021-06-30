const { assert } = require('../utils');

const SchemaEntryField = require('./schema_entry_field');

class SchemaEntry {
  constructor({ name, abstract = false, fields = [], enums = [], parent = null }) {
    assert(
      enums.length == 0 || fields.length == 0,
      `Error loading schema entry ${name}: Entry contains both enums and fields`,
    );
    this.name     = name;
    this.abstract = abstract;
    this.fields   = fields.map(SchemaEntryField.from);
    this.enums    = enums;
    this.parent   = parent;

    // add id field
    if (this.enums.length == 0 && !this.fields.find(({ name, type }) => name === 'id' && type === 'ID!')) {
      this.fields.unshift(new SchemaEntryField());
    }
  }

  toString() {
    return [].concat(
      // entity header
      this.enums.length > 0
      ? `enum ${this.name} {\n`
      : this.abstract
      ? `interface ${this.name} {\n`
      : this.parent
      ? `type ${this.name} implements ${this.parent} @entity {\n`
      : `type ${this.name} @entity {\n`,
      // entities
      (
        this.enums.length == 0
        ? this.fields
        : this.enums
      ).map(e => `\t${e}\n`),
      `}\n`,
    ).filter(Boolean).join('')
  }

  static from(obj) {
    return new SchemaEntry(obj);
  }

  static merge(e1, e2) {
    if (Object.isEmpty(e1)) {
      return e2;
    } else if (Object.isEmpty(e2)) {
      return e1;
    } else {
      assert(
        e1.name === e2.name,
        `Error merging schema entries: name do not match (${e1.name} / ${e2.name})`,
      );
      assert(
        e1.implements === e2.implements,
        `Error merging schema entries: inheritance do not match for ${e1.name}`,
      );
      assert(
        !!e1.enums === !!e2.enums,
        `Error merging schema entries: enum/type clash for ${e1.name}`,
      );
      assert(
        e1.fields.every(f1 => e2.fields.every(f2 => !SchemaEntryField.conflict(f1, f2))),
        `Error merging schema entries: incompatible fields found for ${e1.name}`,
      );

      return SchemaEntry.from({
        name:       e1.name,
        implements: e1.implements,
        fields:     [].concat(e1.fields, e2.fields).unique(({ name }) => name),
        enums:      [].concat(e1.enums,  e2.enums).unique(),
      });
    }
  }
}

module.exports = SchemaEntry;
