import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeObject } from '../utils/sanitizeObject.js'

export async function handleGet(res) {
  const data = await getData()
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
}

export async function handlePost(req, res) {  
  try {
    const parsedBody = await parseJSONBody(req)
    const cleanBody = sanitizeObject(parsedBody)
    await addNewSighting(cleanBody)    

    sendResponse(res, 201, 'application/json', JSON.stringify(cleanBody))
  } catch (err) {
    console.log(err)
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err.message}))
  }
}