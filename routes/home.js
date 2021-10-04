const express = require('express')

const router = express.Router()


router.get('/', (req, res) => res.send('Hello World from dale!'))
router.get('/chelsea', (req, res) => res.send('Chelsea won the champions league!'))

module.exports = router