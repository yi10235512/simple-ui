import { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
 customShots: {
    currentShotsPath: "./examples/cypress/screenshots",
  },
  generateOnly: true,
  failOnDifference: true
};