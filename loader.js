// Made by FallenPixels.
// Runs terminal command to install all npm modules from package.json.
// Recommend that this is ran in a docker container.

// When running this file please include the file you would like to execute.
// Example: node loader.js main.js (.js is optional in name)

const { exec } = require("child_process");
console.log(`loader.js >>> Running npm install.`);
exec(`npm install --prefix ${__dirname}`, (error, stdout, stderr) => {
    if (stderr) {
        console.error(`loader.js >>> Error running npm install:\n${stderr}`);
        return;
    }
    if (error) {
        console.error(`loader.js >>> Error running npm install:\n${error.message}`);
        return;
    }
    console.log(`loader.js >>> ${stdout}`);
}).on("close", () => {
    console.log(`loader.js >>> Completed npm install.`);
    var file = process.argv[2];
    if (file === undefined) {
        console.log("loader.js >>> No file provided to load.");
        return;
    }
    if (!file.endsWith(".js")) {
        console.log("loader.js >>> File name did not end with \".js\". Adding...");
        file+=".js";
    }
    console.log(`loader.js >>> Loading \"${file}\"...`);
    require(__dirname+"/"+file);
    console.log("loader.js >>> Complete. Exiting...");
});