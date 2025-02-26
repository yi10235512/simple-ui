const fg = require('fast-glob');
const path = require('path');
const { typeComponentsFile, component } = require('./docgen/shared.js');

const renderFunctionComponent = ['**/icon/icon.js'];

let entries = fg.sync(['**/*.vue'], { cwd: 'src/components' });
entries = entries.filter((item) => !typeComponentsFile.includes(item));

module.exports = {
  componentsRoot: 'src/components',
  components: [...entries, ...renderFunctionComponent],
  outDir: 'demo-vitepress/dist/components',
  // outFile: 'props.md',
  apiOptions: {
    // ...require('./build/webpack.base.config').resolve,
  },
  getDocFileName: () => {
    return false;
  },
  getDestFile: (file, config) => {
    let basePath = file.substring(0, file.lastIndexOf('/'));
    return path.join(config.outDir, basePath, 'docs/props.md');
  },
  templates: {
    props: require('./docs-build/templates/props').default,
    // events: require('./docs-build/templates/events').default,
    // methods: require('./docs-build/templates/methods').default,
    // slots: require('./docs-build/templates/slots').default,
    component,
  },
};

