const router = require('express-promise-router')();
const ExamsController = require('../controllers/exams.controller');


// Rota responsável por criar um novo exame 
router.post('/exames', ExamsController.createExams);

// Rota responsável por listar todos os exames

router.get('/exames', ExamsController.listAllExams);

// Rota responsável por listar um exame pelo id

router.get('/exames/:id', ExamsController.findExamsById);

// Rota responsável por atualizar um exame pelo id

router.put('/exames/:id', ExamsController.updateExamsById);

// Rota responsável por deletar um exame pelo id

router.delete('/exames/:id', ExamsController.deleteExamsById);

module.exports = router;