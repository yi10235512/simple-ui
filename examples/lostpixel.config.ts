import { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
 customShots: {
    currentShotsPath: "./cypress/screenshots",
  },
  generateOnly: true,
  failOnDifference: true
};