var express = require("express");
const multer = require("multer");

const upload = multer();
var router = express.Router();

const { addFrame } = require("@edward1993/img-editor/dist/lib/imgEditor");

router.post(
  "/frame/:paperWidth?:paperHeight?:color?",
  upload.single("file"),
  async (req, res, next) => {
    let printPaperOptions = undefined;
    let frameOptions = undefined;

    //#region parameter construction
    // Check request params
    if (
      (req.query.paperWidth && req.query.paperHeight === undefined) ||
      (req.query.paperHeight && req.query.paperWidth === undefined)
    ) {
      return res
        .status(400)
        .send(
          "Either both paperWidth and paperHeight should be defined or they shouldn't be at all"
        );
    } else if (req.query.paperWidth) {
      printPaperOptions = {
        printPaperWidth: +req.query.paperWidth,
        printPaperHeight: +req.query.paperHeight,
      };
    }

    // color was specified
    if (req.query.color && req.query.color.length > 0) {
      frameOptions = { frameColor: req.query.color };
    }

    //#endregion
    
    const result = await addFrame(
      req.file.buffer,
      printPaperOptions,
      frameOptions
    );

    if (result && result.errors.length === 0 && result.successful > 0)
      res.status(200).json({ result });
    else
      res
        .status(400)
        .send({ error: "Error while processing the file", data: result });
  }
);

module.exports = router;
