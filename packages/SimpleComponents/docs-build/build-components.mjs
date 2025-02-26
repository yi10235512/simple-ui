import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import startCase from 'lodash/startCase.js';
import { slugify, run, walkDir, writeFile } from './utils.mjs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const rootDir = path.join(__dirname, '../../');

async function runDocAPI() {
    run(`pnpm vue-docgen -c docgen.config.js`);
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function genMainMd() {
    const mds = await glob('./src/components/**/*.md');
    for (const md of mds) {
        const baseName = path.basename(md, '.md');
        const componentFolder = path.dirname(md).split(path.sep).pop();
        
        let outputMd = `# ${capitalizeFirstLetter(baseName)} \n`;
        outputMd += `<TabSwitcher>\n`;
        outputMd += `  <template #dev>\n`;
        outputMd += `\n`;
        outputMd += `  <!--@include: @/../../${md} -->\n`;
        outputMd += `  <!--@include: ./docs/props.md -->\n`;
        outputMd += `\n`;
        outputMd += `  </template>\n`;
        outputMd += `  <template #designer>\n`;
        outputMd += `  <!--@include: ./docs/designer.md -->\n`;
        outputMd += `  </template>\n`;
        outputMd += `</TabSwitcher>\n`;

        writeFile(outputMd, path.join(process.cwd(), `./demo-vitepress/dist/components/${componentFolder}`, `${componentFolder}.md`));
    }
}
export async function buildComponents() {
    console.log('=> buildComponents')
    await runDocAPI();
    await genMainMd();
}


