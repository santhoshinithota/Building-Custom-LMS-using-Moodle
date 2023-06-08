const express = require('express');
const login_user = require('../controllers/auth.js');
const login_org = require('../controllers/auth.js');

const register_user = require('../controllers/auth.js');
const register_org = require('../controllers/auth.js');

/* This will allow  express to identify tha these routes will all be configured */
const router = express.Router();

router.post("/login_user",login_user);
router.post("/login_org",login_org);
router.post("/register_user",register_user);
router.post("/register_org",register_org);

export default router;