var express = require("express");
const multer = require("multer");

const upload = multer();
var router = express.Router();

const { addFrame } = require("@edward1993/img-editor/dist/lib/imgEditor");

router.post("/frame", upload.single("file"), async (req, res, next) => {
  const result = await addFrame(req.file.buffer);

  if (result && result.errors.length === 0 && result.successful > 0)
    res.status(200).json({ result });
  else res.status(400).send("Error while processing the file");
});

module.exports = router;
