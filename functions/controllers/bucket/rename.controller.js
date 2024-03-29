/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const firebase = require("../../utils/firebase.js");

// ** RENAME **
exports.endpoint = (req, res) => {
  // check if all body parameters are correct
  if (!checkBodyParams(req.body)) {
    return res.status(400).json({
      "status": "error",
      "code": 2,
      "detail": "INCORRECT_PARAMETERS",
    });
  }

  const file = firebase.bucket.file(req.userId + req.body.path + req.body.file);
  // Rename the file
  file.rename(req.userId + req.body.path + req.body.name, function(err, renamedFile, apiResponse) {
    if (err) {
      // Return the error code
      return res.status(500).json({
        "status": "error",
        "code": 13,
        "detail": "UNABLE_RENAME_FILE",
      });
    } else {
      // Return the success code
      return res.status(200).json({
        "status": "success",
        "detail": "The file has been renamed !",
      });
    }
  });
};

/**
 * Check the validity of the query parameters
 * @param {Array} bodyParam List of query parameters
 * @return {boolean} Returns true if all parameters are correct
 */
function checkBodyParams(bodyParam) {
  // Check for path [required]
  if (!bodyParam.path) return false;
  // Check for file [required]
  if (!bodyParam.file) return false;
  // Check for name [required]
  if (!bodyParam.name) return false;

  return true;
}
