const { mdclean } = require('./utils.js');
module.exports = exports = {};
const isTableProperty = (property) => {
  return property.some((prop) => /<!--Table-->/g.exec(prop.description));
};

const isIgnore = (tags) => {
  return tags && tags.ignore;
};

const isDeprecated = (tags) => {
  return tags && tags.deprecated;
};

const getTypeName = (pr) => {
  if (pr && pr.tags && pr.tags.property && pr.tags.property.length > 0) {
    if (isTableProperty(pr.tags.property)) {
      const name = pr.tags.property[0].name;
      return `[${name}](#${name.toLowerCase()})`;
    }
    return pr.tags.property[0].name;
  }
  return pr && pr.type && pr.type.name ? pr.type.name : '';
};

const tmpl = (props) => {
  let ret = '';
  props.forEach((pr) => {
    if (isIgnore(pr.tags)) {
      return;
    }
    let p = pr.name;
    const t = pr.description ? pr.description : '';
    const n = getTypeName(pr);
    const v = pr.values ? pr.values.map((pv) => `\`${pv}\``).join(', ') : '-';
    const d = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : '';

    p = isDeprecated(pr.tags) ? `~~${p}~~` : p;
    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(v)} | ${mdclean(d)} |\n`;
  });
  return ret;
};
exports.default = function(props, opt = {}) {
  return `
| Prop name hi    | Description | Type      | Values      | Default     |
| ------------- | ----------- | --------- | ----------- | ----------- |
${tmpl(props)}
  `;
};

