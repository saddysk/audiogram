import {
  deploySite,
  getOrCreateBucket,
  deployFunction,
} from "@remotion/lambda";
import path from "path";

/**
 * @param {typeof AWS_REGION} AWS_REGION - The AWS region value.
 */
const main = async (AWS_REGION) => {
  console.log("deploying...");

  // deploy function
  const { functionName } = await deployFunction({
    region: AWS_REGION,
    timeoutInSeconds: 120,
    memorySizeInMb: 2048,
    createCloudWatchLogGroup: true,
  });

  console.log(`Function: ${functionName}`);

  // deploy site
  const { bucketName } = await getOrCreateBucket({
    region: AWS_REGION,
  });

  const { serveUrl } = await deploySite({
    bucketName,
    entryPoint: path.resolve(process.cwd(), "src/audiogram/index.ts"),
    region: AWS_REGION,
    siteName: "audiogram",
  });

  console.log(`Serve Url: ${serveUrl}`);
};

const AWS_REGION = "us-east-1";

main(AWS_REGION).then(() => console.log("finsihed"));
