const config = require('../config/default.json');
const {
    S3Client,
    PutObjectCommand,
} = require('@aws-sdk/client-s3');
const fs = require('fs');
const dir = require('node-dir');
const mime = require('mime-types');

const DIST_FOLDER = './dist';
const REGION = 'eu-west-2';
const s3 = new S3Client({ region: REGION });

const objectParams = (keyName, body, contentType) => ({
    Bucket: config.bucketName,
    Key: keyName,
    Body: body,
    ContentType: contentType,
});

const putObject = async (objectParams) => {
    let results;
    try {
        results = await s3.send(new PutObjectCommand(objectParams));
        console.log(`Upload  ${config.bucketName}/${objectParams.Key}`);
    } catch (err) {
        console.log('Error', err);
    }
    return results;
};

const run = async () => {
    dir.files(DIST_FOLDER, (err, files) => {
        files.forEach((file) => {
            const key = config.prefix + "/" + file.split('/').slice(1).join('/')
            const body = fs.readFileSync(file);
            const contentType = mime.lookup(file);
            const params = objectParams(key, body, contentType);
            putObject(params);
        });
    });
};

run();
