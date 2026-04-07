import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONbody.js'

export async function handleGet(res) {
  const data = await getData()
  const jsonData = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', jsonData)
}

export async function handlePost(req, res) {
 const rawBody = await parseJSONBody(req) 
 console.log(rawBody)
}