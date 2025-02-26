// import { bulidBrowsersList } from './build-browserslist.mjs';
import { buildComponents } from './build-components.mjs';
// import { buildDesignTokens } from './build-design-tokens.mjs';
// import { buildModules, buildRoutes } from './build-modules.mjs';
// import { buildSearch } from './build-search.mjs';
import { run } from './utils.mjs';
import consola from 'consola';
import ora from 'ora';

async function fetchString() {
    run('node build/fetch-string.js');
}

async function build() {
    const spinner = ora('Building documents...').start();
    try {
        // await bulidBrowsersList();
        // await buildDesignTokens();
        await buildComponents();
        // await buildModules();
        // await buildRoutes();
        // await buildSearch();
        // await fetchString();
        spinner.succeed('Done !');
    } catch (e) {
        consola.error(e);
        spinner.fail('Build failed');
        process.exit(1);
    }
}

build();

