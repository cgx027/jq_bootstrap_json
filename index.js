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

function createReleaseAnchor(element, version, link) {
  const anchorTextTemplate = "<b>{element}</b>: <a href='{link}'>{version}</a>"
  const anchorText = anchorTextTemplate
    .replace('{link}', link)
    .replace('{element}', element)
    .replace('{version}', version)
  return anchorText
}

function addReleases(releases) {
  console.log('adding releases')
  releases.forEach(function(release) {
    console.log('add release: ', release)
    const card = $("<div class='card' style='width: auto'></div></div>")
    const cardBlock = $("<div class='card-block' id='card-block'></div>")
    const cardTitle = $("<h4 class='class-title'>" + release.name + '</h4>')
    const releaseDate = $(
      "<p class='card-text'><b>release date</b>: " + release.date + '</p>'
    )
    const releaseDesc = $(
      "<p class='card-text'><b>release description</b>: " +
        release.description +
        '</p>'
    )
    const biosRelease = $(
      "<p class='card-text'>" +
        createReleaseAnchor(
          'BIOS',
          release.BIOS.version,
          release.BIOS.download
        ) +
        '</p>'
    )
    const bmcRelease = $(
      "<p class='card-text'>" +
        createReleaseAnchor(
          'BMC',
          release.BMC.version,
          release.BMC.download
        ) +
        '</p>'
    )
    const nicRelease = $(
      "<p class='card-text'>" +
        createReleaseAnchor(
          'NIC',
          release.NIC.version,
          release.NIC.download
        ) +
        '</p>'
    )
    cardBlock.append(cardTitle)
    cardBlock.append(releaseDate)
    cardBlock.append(releaseDesc)
    cardBlock.append(biosRelease)
    cardBlock.append(bmcRelease)
    cardBlock.append(nicRelease)
    card.append(cardBlock)
    $('#releases').append(card)
  })
}

async function main() {
  const releaseDataStr = await loadJSON('release.json')
  const releaseData = JSON.parse(releaseDataStr)
  console.log(releaseData)
  addReleases(releaseData)
}

main()
