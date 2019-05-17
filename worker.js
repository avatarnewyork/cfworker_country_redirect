// A Worker which:
// 1. Redirects visitors to the home page ("/") to a
//    country-specific page (e.g. "/US/").
// 2. Blocks hotlinks.
// 3. Serves images directly from Google Cloud Storage.
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  let url = new URL(request.url)
  if (url.pathname == "/") {
    // This is a request for the home page ("/").
    // Redirect to country-specific path.
    // E.g. users in the US will be sent to "/US/".
    let country = request.headers.get("CF-IpCountry")
    url.pathname = "/" + country + "/"
    return Response.redirect(url, 302)

  }else {
    // Regular request. Forward to origin server.
    return fetch(request)
  }
}
