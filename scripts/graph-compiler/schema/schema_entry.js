const { assert } = require('../utils');

const SchemaEntryField = require('./schema_entry_field');

class SchemaEntry {
  constructor({ name, abstract = false, immutable = false, fields = [], enums = [], parent = null }) {
    assert(
      enums.length == 0 || fields.length == 0,
      `Error loading schema entry ${name}: Entry contains both enums and fields`,
    );
    this.name      = name;
    this.abstract  = abstract;
    this.immutable = immutable;
    this.fields    = fields.map(SchemaEntryField.from);
    this.enums     = enums;
    this.parent    = parent;

    // add id field
    if (this.enums.length == 0 && !this.fields.find(({ name, type }) => name === 'id')) {
      this.fields.unshift(new SchemaEntryField());
    }
  }

  toString() {
    return [].concat(
      // entity header
      this.enums.length > 0
        ? `enum ${this.name} {`
        : this.abstract
          ? `interface ${this.name} {`
          : !this.parent
            ? !this.immutable
              ? `type ${this.name} @entity {`
              : `type ${this.name} @entity(immutable: true) {`
            : !this.immutable
              ? `type ${this.name} implements ${this.parent} @entity {`
              : `type ${this.name} implements ${this.parent} @entity(immutable: true) {`,
      // entities
      (
        this.enums.length == 0
        ? this.fields
        : this.enums
      ).map(e => `\t${e}`),
      `}`,
      '',
    ).join('\n')
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
        !e1.parent || !e2.parent || e1.parent == e2.parent,
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
        name:      e1.name,
        abstract:  e1.abstract && e2.abstract,
        immutable: e1.immutable && e2.immutable,
        fields:    [].concat(e1.fields, e2.fields).unique(({ name }) => name),
        enums:     [].concat(e1.enums,  e2.enums).unique(),
        parent:    e1.parent || e2.parent,
      });
    }
  }
}

module.exports = SchemaEntry;
