# Left Behind: stories of NASA hardware on the Moon, Mars and in deep space

**Live site:** https://fadlmaghniwi.github.io/left-behind/
**Challenge:** NASA Space Apps 2026, "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
**Team:** StuMAR0626 (Fadl Maghniwi, Casablanca)

## What it is
An interactive map for school-age space fans. Click a spacecraft left on the Moon or Mars
(or still flying in deep space) and it tells its own story in the first person, with real facts,
a NASA photo, and a link to the NASA source. A 5-question quiz at the end makes it usable in class.

## How it works
- `index.html`: page layout (tabs, map, story card, quiz)
- `app.js`: loads `data.json`, draws the Moon or Mars map with NASA Trek tiles (Leaflet, EPSG:4326), places markers, fills the story card
- `quiz.js`: 5 multiple-choice questions with instant feedback and a score
- `data.json`: one entry per object (coordinates, dates, mass, status, science, story, image, sources)
- `known_gaps.md`: facts we checked and where each extra source came from

**Coordinates:** NASA gives Mars longitudes from 0 to 360° E; web maps use −180 to +180,
so values above 180 are converted with `lon − 360` (e.g. Viking 1: 312.05° E → −47.95).

## Run it locally
Open the folder in VS Code and use Live Server (or any local web server).
Opening `index.html` directly from disk won't work, because browsers block `fetch("data.json")` from `file://`.

## NASA data and resources used
- NASA NSSDCA Master Catalog: facts, coordinates and photos for each spacecraft
- NASA Moon Trek (LRO WAC global mosaic) and Mars Trek (Viking MDIM 2.1 colour mosaic): map tiles
- NASA/JPL news releases: Opportunity end of mission (2019), Voyager 1 in interstellar space (2013)
- Golombek et al. 2020, *Earth and Space Science*: InSight lander coordinates
- Leaflet 1.9.4 (open-source map library)

## Known limits / next steps
- 6 objects so far; more Apollo sites, Spirit, Phoenix and Pioneer could be added the same way
- Some objects have no photo yet (the card hides a missing image instead of showing a broken one)
- Planned: French and Arabic versions for Moroccan schools, and a live distance for Voyager 1 from JPL Horizons
