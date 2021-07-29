const fs = require("fs")

let dir = fs.readdirSync("./")
let pngs = dir.filter(isPng)



function isPng(filename) {
    let len = filename.length
    return len > 4 && filename.substring(len-4) === ".png"
}

// assume input is png
function removeExtension(filename) {
    return filename.substring(0, filename.length-4)
}

function resizeCommand(fileName) {
    let noExtensionFileName = removeExtension(fileName)
    let filenameResized = noExtensionFileName + "__resized";
    // 16:9 ratio
    return {
        oldFileNameResize: fileName,
        newFileNameResize: filenameResized + ".png",
        commandResize: `convert -resize 800x450 ${noExtensionFileName}.png ${filenameResized}.png; `
    }
}


function compressCommand(fileName) {
    let noExtensionFileName = removeExtension(fileName)
    let filenameCompressed = noExtensionFileName + "__compressed";
    return {
        oldFileNameCompress: fileName,
        newFileNameCompress: filenameCompressed + ".png",
        commandCompress: `pngquant --quality 90-95 --force ${noExtensionFileName}.png --output ${filenameCompressed}.png; `
    }
}

function getCommands(pngs){
    return pngs.map(file => {
        let {oldFileNameResize, newFileNameResize, commandResize } = resizeCommand(file);
        let compressedFileName = removeExtension(file) + "__resized.png"
        let {oldFileNameCompress, newFileNameCompress, commandCompress} = compressCommand(compressedFileName);
        return [
            commandResize,
            `rm ${file}`,
            commandCompress,
            `rm ${compressedFileName}`,
            `mv ${newFileNameCompress} ${file}`
        ].join("\n")
    })
}

let COMMAND = getCommands(pngs).join("\n\n")

console.log(COMMAND)






