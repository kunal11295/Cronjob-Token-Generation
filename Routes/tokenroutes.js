import express from "express"
import { CreateSearch, pollasearch } from "../Controller/Skyscannerapi.js";

var router = express.Router();

router.post('/CreateSearch',CreateSearch)
router.post('/pollasearch',pollasearch)


export default router;
