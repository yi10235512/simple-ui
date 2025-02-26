const fg = require('fast-glob');

let entries = fg.sync(['**/*.vue'], { cwd: 'packages/components' });

module.exports = {
  componentsRoot: 'packages/components',
  components: [...entries],
  getDocFileName: () => {
    return false;
  },
  outDir: './docs/components-gen',
}
