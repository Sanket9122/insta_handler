const express = require('express');
const router = express.Router();

const codeRoutes = require('./coderoutes');

router.use('/route', codeRoutes);


router.get('/helloendpoint', (req, res) => res.json({ pong: true }));
router.get('/_test', (req, res) => res.json({ ok: 'users router alive' }));
module.exports = router;