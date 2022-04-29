const { listObjects, putObjects } = require("./s3-util");

const run = async () => {
  listObjects().then(() => putObjects());
}

run();