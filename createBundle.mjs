import { bundle } from "@remotion/bundler";
import { enableTailwind } from "@remotion/tailwind";

/**
 * @param {any} currentConfiguration - The currentConfiguration value.
 */
export const webpackOverride = (currentConfiguration) => {
  return enableTailwind(currentConfiguration);
};

/**
 * @param {number} progress - The progress value.
 */
const onProgress = (progress) => {
  console.log(`Webpack bundling progress: ${progress}%`);
};

const main = async () => {
  await bundle({
    entryPoint: "src/audiogram/index.ts",
    onProgress,
    webpackOverride,
    outDir: "/Users/mickymouse/Dev/1811/remotion/audiogram/bundled",
  });
};

main().then(() => console.log("finsihed"));
