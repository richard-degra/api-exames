const router = require('express-promise-router')();
const UnidController = require('../controllers/unid.controller');

// Rota para registrar todas as unidades //

router.post('/unids/', UnidController.createUnid);

// Rota para consultar todas as unidades //

router.get('/unids/', UnidController.listAllUnid);

// Rota para consultar unidades pelo id //

router.get('/unids/:id', UnidController.findUnidById);

// Rota para atualizar uma unidade pelo id //

router.put('/unids/:id', UnidController.updateUnidById);

// Rota para deletar uma unidade pelo id //

router.delete('/unids/:id', UnidController.deleteUnidById);

module.exports = router;