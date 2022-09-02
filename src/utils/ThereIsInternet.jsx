let response;

try {
  await fetch("https://www.youtube.com", { method: 'HEAD' })
    .then(e => {
      if (e.ok) response = e.ok
    })
} catch {
  response = false
}

export default response


