var path = require('path');
export function getTopicName(fileName: string) {
    return path.basename(fileName, path.extname(fileName));
}
