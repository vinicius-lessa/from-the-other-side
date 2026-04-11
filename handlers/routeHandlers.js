import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeObject } from '../utils/sanitizeObject.js'
import sightingEvents from '../events/sightingEvents.js'
import { stories } from "../data/stories.js";

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
    sightingEvents.emit('sighting-added', cleanBody)

    sendResponse(res, 201, 'application/json', JSON.stringify(cleanBody))
  } catch (err) {
    console.log(err)
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err.message}))
  }
}

export async function handleNews(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)
    
    res.write(
      `data: ${JSON.stringify({ event: 'news-update', story: stories[randomIndex] })}\n\n`
    )
  }, 3000)
}