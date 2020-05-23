const router = require('express-promise-router')();
const LabsController = require('../controllers/labs.controller');

// Rota para registrar um novo lab //

router.post('/labs', LabsController.createLab); 

// Rota para listar todos os labs //

router.get('/labs', LabsController.listAllLabs);

// Rota para listar labs pelo id //

router.get('/labs/:id', LabsController.findLabsById);

// Rota para atualizar labs pelo id //

router.put('/labs/:id', LabsController.updateLabsById);

// Rota para deletar labs pelo id //

router.delete('/labs/:id', LabsController.deleteLabsById);

module.exports = router;