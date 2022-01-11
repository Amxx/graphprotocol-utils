const path = require('path');

const { readFile } = require('../utils');

class Subgraph {
  static fromConfig(config) {
    const relative = (file) => path.relative(path.dirname(config.subgraphPath()), file);
    const modules  = Object.fromEntries(
      config.modules()
      .map(module => {
        try {
          return [
            module,
            {
              yaml: config.require.resolve(`${module}.yaml`),
              ts:   config.require.resolve(`${module}.ts`),
            }
          ];
        } catch {
          return undefined
        }
      })
      .filter(Boolean)
    );

    Object.values(modules).forEach(item => Object.assign(item, { template: readFile(item.yaml) }));

    return [].concat(
      `specVersion: 0.0.2\n`,
      `schema:\n`,
      `  file: ${relative(config.schemaPath())}\n`,
      // datasources
      config.datasources().length && `dataSources:\n`,
      config.datasources()
        .flatMap(datasource => [].concat(datasource.module || []).map(module => Object.assign({}, datasource, { module })))
        .map((datasource, i, array) => Object.assign(
          {},
          config._argv,
          config._cfg,
          {
            id:   array.findIndex(({ module }) => module === datasource.module) === i ? datasource.module : `${datasource.module}-${i}`,
            root: relative(config.root()),
            file: relative(modules[datasource.module].ts),
          },
          datasource,
        ))
        .map(datasource => [].concat(
          modules[datasource.module].template
            .replace(/\{(\w+)\}/g, (_, varname) => datasource[varname])
            .replace(/^.*undefined.*\n/mg, ''),
          modules[datasource.module].template.search(/^( {6}|\t{3})file:/gm) === -1
            && `      file: ${relative(modules[datasource.module].ts)}\n`,
        ).filter(Boolean).join('')),
      // templates
      config.templates().length && `templates:\n`,
      config.templates()
        .map(template => Object.assign(
          {},
          config._argv,
          config._cfg,
          {
            id:   template,
            root: relative(config.root()),
          },
        ))
        .map(template => [].concat(
          modules[template.id].template
            .replace(/\{(\w+)\}/g, (_, varname) => template[varname])
            .replace(/^.*undefined.*\n/mg, ''),
          `      file: ${relative(modules[template.id].ts)}\n`,
        ).join('')),
      ).filter(Boolean).join('');
  }
}

module.exports = Subgraph;
