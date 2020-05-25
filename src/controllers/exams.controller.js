// Requires da aplicação
const db = require("../config/database");


// Validação de exames

const validateExams = async (body) => {
  const {exam_nome, compra, venda} = body;
  const response = {
   errors: [],
   success: true  
  }
 if (compra*1 >= venda*1) {
   response.errors.push("Preço de compra não pode ser maior que o de venda");
   response.success = false;
 }
 if (exam_nome === '') {
  response.errors.push("Nome do exame não pode ficar em branco");
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

  const { rows } = await db.query(  
    "INSERT INTO exams (exam_nome, compra, venda) VALUES ($1, $2, $3)",
    [exam_nome, compra, venda]
  );

  res.status(201).send({
    message: "Adicionado com sucesso!",
    body: {
      Exame: { exam_nome, compra, venda }
    }
  }) 
};

// Associar um exame com uma unidade 

exports.createExamsLink = async (req, res) => {
  const {exam_id, unid_id} = req.body;
  const {rows} = await db.query(
    'INSERT INTO assoc (exam_id, unid_id) VALUES ($1, $2)',
    [exam_id, unid_id]
  );
  res.status(201).send({
    message: 'Adicionado com sucesso!',
    body:{
      Exame: {exam_id, unid_id}
    }
  })
};

// Consulta de todos os exames

exports.listAllExams = async (req, res) => {
    const response = await db.query('SELECT id, exam_nome FROM exams ORDER BY exam_nome ASC');
    res.status(200).send(response.rows);
  };

// Consulta de exames por id

exports.findExamsById = async (req, res) => {
    const ExamsId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM exams WHERE id = $1', [ExamsId]);
    res.status(200).send(response.rows);
  }

// COnsulta de exames linkados com alguma unidade

exports.listLink = async (req, res) => {
  const {unid_id, exam_id, lab_id} = req.body
  const response = await db.query(
   'SELECT * from assoc INNER JOIN unid on assoc.unid_id = unid.lab_id'
  )
  
  res.status(200).send(response.rows)
  }

// Atualizar exames por id

exports.updateExamsById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { exam_nome, compra, venda} = req.body;
  
    const response = await db.query(
      "UPDATE exams SET exam_nome = $1, compra = $2, venda = $3 WHERE id = $4",
      [exam_nome, compra, venda, id]
    );
  
    res.status(200).send({ message: "Atualizado com sucesso!" });
  };
  
// Deletar exames por id

exports.deleteExamsById = async (req, res) => {
    const ExamsId = parseInt(req.params.id);
    await db.query('DELETE FROM exams WHERE id = $1', [
      ExamsId
    ]);
  
    res.status(200).send({ message: 'Deletado com sucesso!', ExamsId });
  };
  