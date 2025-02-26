const convertMd2ComponentDocumentation = require('./convert-md');
const fs = require('fs-extra');

const fileRegex = /\.md$/;

export const createDocPlugin = async ({ vuePlugin: vue } = {}) => {
    let server;
    const modulesMap = new Map();
    const vuePlugin = vue({
        include: /\.(vue|md)$/,
    });
    const docPlugin = {
        name: 'doc-vite',
        configureServer(_server) {
            server = _server;
        },
        async transform(_, id) {
            if (fileRegex.test(id)) {
                const content = await fs.readFile(id, 'utf-8');
                const { template, depModules } = await convertMd2ComponentDocumentation(content, id);
                if (server) {
                    const { moduleGraph } = server;
                    const thisModule = moduleGraph.getModuleById(id);
                    for (const dep of depModules) {
                        const entryModule = moduleGraph.createFileOnlyEntry(dep);
                        modulesMap.set(entryModule.file, thisModule);
                    }
                }
                return template;
            }
        },
        async handleHotUpdate(ctx) {
            let { file, modules, server } = ctx;
            const { moduleGraph } = server;
            if (modulesMap.has(file)) {
                const mdModule = modulesMap.get(file);
                file = mdModule.file;
                modules = [...moduleGraph.getModulesByFile(file)];
            }
            if (fileRegex.test(file)) {
                const content = await fs.readFile(file, 'utf-8');
                const { template } = await convertMd2ComponentDocumentation(content, file);
                //TODO(Red): tempalte characters as examples in template should be escape
                return vuePlugin.handleHotUpdate({
                    ...ctx,
                    file,
                    modules,
                    read: () => template,
                });
            }
        },
    };
    return [docPlugin, vuePlugin];
};

