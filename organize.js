#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


let targetDirectory = process.argv[2] || __dirname;
targetDirectory = path.resolve(targetDirectory);

if (!fs.existsSync(targetDirectory)) {
    console.log(`❌ Error: The folder path "${targetDirectory}" does not exist!`);
    process.exit(1);
}


const logFilePath = path.join(targetDirectory, 'organize_log.txt');


function writeLog(message) {
    const timeStamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logEntry = `[${timeStamp}] ${message}\n`;
    
    fs.appendFileSync(logFilePath, logEntry);
}

console.log(` Starting organization of: ${targetDirectory}\n`);
writeLog(`--- STARTED NEW ORGANIZATION RUN ---`);

const extensionsMap = {
    '.jpg': 'Images', '.jpeg': 'Images', '.png': 'Images', '.gif': 'Images',
    '.pdf': 'Documents', '.docx': 'Documents', '.txt': 'Documents',
    '.mp4': 'Videos', '.mkv': 'Videos',
    '.zip': 'Archives', '.rar': 'Archives'
};

const duplicateRegex = /\s\(\d+\)\.[a-zA-Z0-9]+$/;

fs.readdir(targetDirectory, (err, files) => {
    if (err) return console.log("Uh oh, couldn't read the folder:", err);

    let movedCount = 0;
    let deletedCount = 0;

    files.forEach(file => {
        if (file === 'organize.js' || file === 'organize_log.txt') return;

        const itemPath = path.join(targetDirectory, file);
        const stats = fs.statSync(itemPath); // We grab the stats object and save it

        if (stats.isDirectory()) return;

        if (duplicateRegex.test(file)) {
            fs.unlink(itemPath, (err) => {
                if (err) {
                    console.log(`❌ Failed to delete ${file}: ${err}`);
                    writeLog(`ERROR: Failed to delete duplicate ${file}`);
                } else {
                    console.log(`🗑️  Deleted duplicate: ${file}`);
                    writeLog(`DELETED: Duplicate file ${file}`);
                    deletedCount++;
                }
            });
            return; 
        }

        const ext = path.extname(file).toLowerCase();
        const baseFolder = extensionsMap[ext] || 'Others'; 

        const creationDate = new Date(stats.birthtime);
        
        const month = creationDate.toLocaleString('default', { month: 'short' });
        const year = creationDate.getFullYear();
        const dateFolderName = `${month}-${year}`; 

        const folderPath = path.join(targetDirectory, baseFolder, dateFolderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const newFilePath = path.join(folderPath, file);

        fs.rename(itemPath, newFilePath, (err) => {
            if (err) {
                console.log(`❌ Could not move ${file}: ${err}`);
                writeLog(`ERROR: Failed to move ${file}`);
            } else {
                console.log(`✅ Moved: ${file} --> [${baseFolder}/${dateFolderName}]`);
                writeLog(`MOVED: ${file} --> ${baseFolder}/${dateFolderName}`);
                movedCount++;
            }
        });
    });
});