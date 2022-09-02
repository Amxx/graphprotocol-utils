class SchemaEntryField {
  constructor({ name = 'id', type = 'ID!', derived = null } = {}) {
    this.name    = name;
    this.type    = type;
    this.derived = derived;
  }

  toString() {
    return this.derived
    ? `${this.name}: [${this.type}]! @derivedFrom(field: "${this.derived}")`
    : `${this.name}: ${this.type}`;
  }

  static from(obj) {
    return new SchemaEntryField(obj);
  }

  static conflict(f1, f2) {
    return f1.name === f2.name && (f1.type !== f2.type || f1.derived !== f2.derived);
  }
}

module.exports = SchemaEntryField;
