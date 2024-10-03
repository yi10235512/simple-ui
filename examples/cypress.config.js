import { defineConfig } from "cypress";
import { rename } from "fs";
import { basename, join } from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      on('after:screenshot', (details) => {

        // Extract the filename from the original path
        const filename = basename(details.path);

        // Define the new path at the top level of the screenshots folder
        const newPath = join(config.screenshotsFolder, filename);

        // eslint-disable-next-line no-undef
        return new Promise((resolve, reject) => {
          // Rename (move) the file to the new path
          rename(details.path, newPath, (err) => {
            if (err) return reject(err)

            // Resolve with the new path for accurate results
            resolve({ path: newPath });
          });
        });
      });
    },
  },
});
