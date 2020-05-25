const router = require('express-promise-router')();
const ExamsController = require('../controllers/exams.controller');


// Rota responsável por criar um novo exame 
router.post('/exames', ExamsController.createExams);

// Rota para linkar os exames com uma unidade 

router.post('/exames/link', ExamsController.createExamsLink)

// Rota responsável por listar todos os exames

router.get('/exames', ExamsController.listAllExams);

// Rota responsável por listar um exame pelo id

router.get('/exames/:id', ExamsController.findExamsById);

// Rota para listar os exames linkados com alguma unidade

router.get('/exames/link/list', ExamsController.listLink);

// Rota responsável por atualizar um exame pelo id

router.put('/exames/:id', ExamsController.updateExamsById);

// Rota responsável por deletar um exame pelo id

router.delete('/exames/:id', ExamsController.deleteExamsById);

module.exports = router;