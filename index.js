async function loadJSON(filename) {
  return new Promise(function(resolve, reject) {
    var xobj = new XMLHttpRequest()
    xobj.overrideMimeType('application/json')
    xobj.open('GET', filename, true) // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == '200') {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        resolve(xobj.responseText)
      }
    }
    xobj.send(null)
  })
}

async function main() {
  const releaseDataStr = await loadJSON('release.json')
  const releaseData = JSON.parse(releaseDataStr)
  console.log(releaseData)
}

main()
