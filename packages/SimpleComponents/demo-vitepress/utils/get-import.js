const { Parser } = require('acorn');
const walkes = require('walkes');
const ACORN_OPTIONS = {
    ecmaVersion: 2019,
    sourceType: 'module',
};

function getAst(code, plugins = []) {
    const parser = Parser.extend(...plugins);
    try {
        return parser.parse(code, ACORN_OPTIONS);
    } catch (err) {
        return void 0;
    }
}

module.exports = function getImports(code) {
    const ast = getAst(code);
    if (!ast) {
        return [];
    }
    const imports = [];
    walkes(ast, {
        ImportDeclaration(node) {
            if (node.source) {
                imports.push(node.source.value);
            }
        },
        CallExpression(node) {
            if (node.callee && node.callee.name === 'require' && node.arguments && node.arguments[0].value) {
                imports.push(node.arguments[0].value);
            }
        },
    });
    return imports;
};

