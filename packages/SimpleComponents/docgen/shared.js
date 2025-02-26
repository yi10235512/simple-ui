const consola = require('consola');
const startCase = require('lodash/startCase');

function renderedIt(content, displayName, title) {
    if (content) {
        return `
### ${startCase(displayName)} - ${title}
${content}
        `;
    }
    return '';
}

function translatePropertyTable(props) {
    let content = '';
    if (!props) {
        return content;
    }
    for (const prop of props) {
        if (!prop.tags || !prop.tags.property) {
            continue;
        }
        for (const item of prop.tags.property) {
            const desc = item.description?.trim() ?? '';
            if (/<!--Table-->/g.test(desc)) {
                content += `
#### ${item.name}
${desc}`;
            }
        }
    }
    return content;
}

const ignoreComponentsName = [
    'TreeNode',
    'GroupNode',
    'TableHeaderCell',
    'Window',
    'BaseSelect',
    'SelectBaseOption',
    'SelectDropdown',
];

exports = module.exports = {
    typeComponentsFile: [
        'scrollbar/scrollbar.vue',
        'portal/portal.ts',
        'portal/portal-target.ts',
        'icon/icon.vue',
        'expandable-item/expandable-item.vue',
    ],
    component(renderedUsage, doc, config) {
        try {
            const { displayName, description, docsBlocks } = doc;
            if (ignoreComponentsName.includes(displayName)) {
                consola.info(`ignore ${displayName}`);
                return ``;
            }
            consola.success(`Generate ${displayName} markdown success`);
            return `
  ## ${startCase(displayName)} API

  ${description ? '> ' + description : ''}

  ${renderedIt(renderedUsage.props, displayName, 'Props')}
  ${renderedIt(translatePropertyTable(doc.props), displayName, 'Property')}
  ${renderedIt(renderedUsage.methods, displayName, 'Methods')}
  ${renderedIt(renderedUsage.events, displayName, 'Events')}
  ${renderedIt(renderedUsage.slots, displayName, 'Slots')}
  `;
        } catch (e) {
            console.error(e);
        }
    },
};

