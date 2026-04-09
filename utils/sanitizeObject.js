import sanitizeHtml from 'sanitize-html'

export function sanitizeObject(dirtyObject) {
  let sanitizedObject = dirtyObject;

  // Using For...In
  for(let key in sanitizedObject) {
    if (typeof sanitizedObject[key] === "string") {
      sanitizedObject[key] = sanitizeHtml(sanitizedObject[key], {
        allowedTags: ['b'],
        allowedAttributes: {}
      })
    }
  }

  // Using For...Of with Object.entries (return an Array)
  // for (const [key, value] of Object.entries(sanitizedObject)) {
  //   if (typeof value === "string") {
  //     sanitizedObject[key] = sanitizeHtml(value, {
  //       allowedTags: ['b'],
  //       allowedAttributes: {}
  //     })
  //   }
  // }

  return sanitizedObject;
}