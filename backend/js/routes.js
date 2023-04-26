const router = require('express').Router()
const { rawListeners } = require('../js/mongoose_model')
const parkingManagementModel = require('../js/mongoose_model')

// cadastrar cliente
router.post('/api/add', async (req, res) => 
{ 
    const novoItem = new parkingManagementModel
    (
        {
            item: req.body.item
        }
    )

    const salvarItem = await novoItem.save()
    res.status(200).json(salvarItem)
    
})

module.exports = router