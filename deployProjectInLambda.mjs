import {
  deploySite,
  getOrCreateBucket,
  deployFunction,
} from "@remotion/lambda";
import path from "path";

const AWS_REGION = "us-east-1";

const main = async () => {
  const args = process.argv.slice(2);

  let templateName = null;
  let isDeployFunction = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--template" && args[i + 1]) {
      templateName = args[i + 1];
    }

    if (args[i] === "-f" && args[i + 1] === "true") {
      isDeployFunction = Boolean(args[i + 1]);
    }
  }

  // deploy function
  if (isDeployFunction === true) {
    console.log("Deploying function...");

    const functionName = await deployNewFunction();

    console.log(`Function: ${functionName}\n`);
  }

  // deploy site
  const serveUrl = await deployNewSite(templateName ?? "audiogram");

  console.log(`Serve Url: ${serveUrl}`);
};

async function deployNewFunction() {
  const { functionName } = await deployFunction({
    region: AWS_REGION,
    timeoutInSeconds: 300,
    memorySizeInMb: 2048,
    createCloudWatchLogGroup: true,
  });

  return functionName;
}

/**
 * @param {string} templateName - site name reffered by template name
 */
async function deployNewSite(templateName) {
  console.log(`Deploying site with template: ${templateName}`);

  const { bucketName } = await getOrCreateBucket({
    region: AWS_REGION,
  });

  const { serveUrl } = await deploySite({
    bucketName,
    entryPoint: path.resolve(process.cwd(), "src/audiogram/index.ts"),
    region: AWS_REGION,
    siteName: templateName,
  });

  return serveUrl;
}

main().then(() => console.log("finsihed"));
