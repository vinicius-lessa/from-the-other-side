import { EventEmitter } from 'node:events'
import { createAlert } from '../utils/createAlert.js'

const sightingEvents = new EventEmitter()
sightingEvents.on('sighting-added', createAlert)

export default sightingEvents