const log = (...args) => console.log(...args);
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/upload/")[1];

    // remove version (v123/)
    const withoutVersion = parts.replace(/^v\d+\//, "");

    // decode URL (%20 → space)
    const decoded = decodeURIComponent(withoutVersion);

    // remove extension
    const publicId = decoded.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (err) {
    return null;
  }
};
module.exports = {  log, getPublicIdFromUrl };
