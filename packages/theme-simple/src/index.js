import StyleDictionary from 'style-dictionary';

const config = {
  source: ["tokens/**/*.tokens.json"],
  platforms: {
    css: {
      buildPath: "dist/css/",
      // transformGroup: "css",
      transforms: ["attribute/cti", "name/kebab", "size/pxToRem", "color/rgb"],
      files: [
        {
          format: "css/variables",
          destination: "variables.css",
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
}

const sd = new StyleDictionary(config);
sd.buildAllPlatforms();
