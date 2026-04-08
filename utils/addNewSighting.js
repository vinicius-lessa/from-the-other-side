import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto';
import { getData } from "./getData.js";

export async function addNewSighting(newSighting) {
  try {
    newSighting = Object.assign({uuid: randomUUID()}, newSighting)

    const data = await getData()
    data.push(newSighting)

    const jsonData = JSON.stringify(data, null, 2)
    const dataFilePath = path.join('data', 'data.json')
    
    await fs.writeFile(dataFilePath, jsonData, 'utf8')
  
  } catch (err) {
    throw new Error(err)
  }

}
