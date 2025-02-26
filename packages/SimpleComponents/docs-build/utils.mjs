import fs from 'fs-extra';
import path from 'path';
import child_process from 'child_process';

export function run(command) {
  child_process.execSync(command, { stdio: 'inherit' });
}

// this function is synchronize
export function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walkDir(dirPath, callback) : callback(path.join(dir, f), dir);
  });
}

export function readJsonFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  return JSON.parse(content);
}

export function writeJsonFile(obj, file) {
  return writeFile(JSON.stringify(obj, null, 2), file);
}

export function writeFile(content, file) {
  const dirname = path.dirname(file);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  fs.writeFileSync(file, content);
}

export function slugify(str) {
  const getTitle = function(str) {
    if (/^\[[^\]]+\]\(/.test(str)) {
      const m = /^\[([^\]]+)\]/.exec(str);
      if (m) return m[1];
    }
    return str;
  }
  const specialRE = /[\s·/_\\,:;\.\(\)\[\]]+/g;
  const andRE = /&/g;
  const multipleDashRE = /--+/g;

  str = getTitle(str);
  str = str.toLowerCase();

  str = str.split(' ').join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/<\/?[^>]+>/).join('');
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  str = str.replace(specialRE, '-')
    .replace(andRE, '-and-')
    .replace(multipleDashRE, '-')
  return str;
};

