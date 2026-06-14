const { GarminConnect } = require('../dist/index');
const fs = require('fs/promises');
const path = require('path');

const IMAGE_FILE_NAME = 'image.jpg';
const IMAGE_FILE_FOLDER = './assets/';
const ACTIVITY_ID = 123;

(async function () {
    const GARMIN_USERNAME = process.env.GARMIN_USERNAME;
    const GARMIN_PASSWORD = process.env.GARMIN_PASSWORD;

    if (!GARMIN_USERNAME || !GARMIN_PASSWORD) {
        throw new Error(
            'GARMIN_USERNAME and GARMIN_PASSWORD must be set in the environment variables'
        );
    }

    const GCClient = new GarminConnect({
        username: GARMIN_USERNAME,
        password: GARMIN_PASSWORD
    });
    await GCClient.login();

    const response = await GCClient.uploadActivityPhoto(
        ACTIVITY_ID,
        path.join(IMAGE_FILE_FOLDER, IMAGE_FILE_NAME)
    );

    console.log(
        'Course created with id:',
        response,
        `https://connect.garmin.com/modern/course/${ACTIVITY_ID}`
    );
})();
