const fs = require('fs');
const dir = require('node-dir');
const mime = require('mime-types');
const { ListObjectsCommand, PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const config = require("../ci/default");

const REGION = 'eu-west-2';
const DIST_FOLDER = './dist';
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

const objectParams = (keyName, body, contentType) => ({
    Bucket: config.aws.bucketName,
    Key: keyName,
    Body: body,
    ContentType: contentType,
});

const putObject = async (objectParams) => {
    let results;
    try {
        results = await s3.send(new PutObjectCommand(objectParams));
        console.log(`Upload  ${config.aws.bucketName}/${objectParams.Key}`);
    } catch (err) {
        console.log('Error', err);
    }
    return results;
};

const putObjects = async () => {
  // TODO should really clear the folder first
  dir.files(DIST_FOLDER, (err, files) => {
        files.forEach((file) => {
            const key = config.aws.prefix + "/" + file.split('/').slice(1).join('/')
            const body = fs.readFileSync(file);
            const contentType = mime.lookup(file);
            putObject(objectParams(key, body, contentType));
        });
    });
};

module.exports = {
  listObjects,
  putObjects
};
