
const resourceCache = {};
const readyCallbacks = [];


function isReady() {
  let ready = true;
  Object.keys(resourceCache).forEach((k) => {
    if (resourceCache.hasOwnProperty(k)
              && !resourceCache[k]) {
      ready = false;
    }
  });
  return ready;
}

function loadURL(url) {
  if (resourceCache[url]) {
    return resourceCache[url];
  }

  const img = new Image();
  img.onload = () => {
    resourceCache[url] = img;
    if (isReady()) {
      readyCallbacks.forEach((func) => { func(); });
    }
  };
  resourceCache[url] = false;
  img.src = url;
}
// Load an image url or an array of image urls
function load(urlOrArr) {
  if (urlOrArr instanceof Array) {
    urlOrArr.forEach((url) => {
      loadURL(url);
    });
  } else {
    loadURL(urlOrArr);
  }
}


function get(url) {
  return resourceCache[url];
}

function onReady(func) {
  readyCallbacks.push(func);
}
const resources = {
  load,
  get,
  onReady,
  isReady,
};
export default resources;
