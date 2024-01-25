const router = require("express").Router();

router.get('/comments', (req, res) => {
    res.json('Comments routes')
})

module.exports = router