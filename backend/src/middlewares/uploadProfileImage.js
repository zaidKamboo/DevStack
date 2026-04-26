const {
  uploadAvatarConfig,
} = require("../../config/multer/uploadProfileImage.config");

exports.uploadProfileImageMiddleware = (req, res, next) => {
  uploadAvatarConfig.single("profile-image")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).send({ error: err.message });
    }
    console.log("Upload successful", req.file);
    next();
  });
};
// exports.uploadProfileImageMiddleware =
//   uploadAvatarConfig.single("profile-image");
