// Requires da db
const db = require('../config/database')

// imports da aplicação 
const { listAllExamsQuery, createExamQuery, listByIdQuery, updateExamQuery,
deleteExamQuery, linkListQuery, createLinkQuery} = require('../queries/exams');

// Validação de exames

const validateExams = async (body) => {
  const {exam_nome, compra, venda} = body;
  const response = {
   errors: [],
   success: true  
  }

 if (exam_nome === undefined || exam_nome === null || exam_nome === '' ) {
  response.errors.push('Nome do exame não pode ficar em branco');
  response.success = false;
  } 

if (compra === undefined || compra === null || compra === NaN || compra <=0) {
  response.errors.push('Preço de compra inválido')
  response.success = false;
}

if (venda === undefined || venda === null || venda === NaN || venda <=0) {
  response.errors.push('Preço de venda inválido')
  response.success = false;
}

if (!response.success) {
  return response
}

 if (compra*1 >= venda*1) {
   response.errors.push('Preço de compra não pode ser maior que o de venda');
   response.success = false;
 }


  return response
  
}

// Criação de exames

exports.createExams = async (req, res) => {
  const { exam_nome, compra, venda } = req.body;
  const validation = await validateExams(req.body);

  if (validation.success == false) {
    res.status(400).send({message: validation.errors})
    return;
  }
 
  const { rows } = await db.query(createExamQuery, [exam_nome, compra, venda]);

// Objeto auxiliar

  const response = {
    message: 'Adicionado com sucesso',
    body: {
      name: exam_nome,
      purch_price: compra,
      sell_price: venda
    }
  }
 
  res.status(201).send(response)
};

// Associar um exame com uma unidade 

exports.createExamsLink = async (req, res) => {
  const {exam_id, unid_id} = req.body;
  const {rows} = await db.query(createLinkQuery, [exam_id, unid_id]);
  res.status(201).send({
    message: 'Adicionado com sucesso!',
    body:{
      Exame: {exam_id, unid_id}
    }
  })
};

// Consulta de todos os exames

exports.listAllExams = async (req, res) => {
    const response = await db.query(listAllExamsQuery);
    res.status(200).send(response.rows);
  };

// Consulta de exames por id

exports.findExamsById = async (req, res) => {
    const ExamsId = parseInt(req.params.id);
    const response = await db.query(listByIdQuery, [ExamsId]) ;
    res.status(200).send(response.rows);
  }

// COnsulta de exames linkados com alguma unidade

exports.listLink = async (req, res) => {
  const {unid_id, exam_id, lab_id} = req.body
  const response = await db.query(linkListQuery)
  
  res.status(200).send(response.rows)
  }

// Atualizar exames por id

exports.updateExamsById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { exam_nome, compra, venda} = req.body;
  
    const response = await db.query(updateExamQuery, [exam_nome, compra, venda, id]);
  
    res.status(200).send({ message: 'Atualizado com sucesso!' });
  };
  
// Deletar exames por id

exports.deleteExamsById = async (req, res) => {
    const ExamsId = parseInt(req.params.id);
    await db.query(deleteExamQuery, [ExamsId]);
  
    res.status(200).send({ message: 'Deletado com sucesso!', ExamsId });
  };
  