const config = require("../ci/default");
const { ListObjectsCommand, S3Client } = require("@aws-sdk/client-s3");

const REGION = 'eu-west-2';
const s3 = new S3Client({ region: REGION });
const bucketParams = { Bucket: config.aws.bucketName };

const listObjects = async () => {
    console.log(`\nContents of ${config.aws.bucketName}`)
    try {
        const data = await s3.send(new ListObjectsCommand(bucketParams));
        data.Contents.forEach((item) => console.log(item.Key))
    } catch (err) {
        console.log('Error', err);
    }
};

const run = async () => {
    listObjects();
}

run();