/**
 * exportRoutes.js
 * @description :: CRUD API routes for export
 */

const express = require("express");
const router = express.Router();
const exportController = require("../controller/export/exportController");

router.get("/download", exportController.exportOrderItem);


module.exports = router;