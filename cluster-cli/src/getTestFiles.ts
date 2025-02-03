import fs from 'fs';

export default async function getFiles(directoryPath:string) {

  try {
    return  fs.readdirSync(directoryPath);
  } catch (error) {
    console.error('Error reading files', error);
    return [];
  }
}
