const db = require("../config/database");


// Criação de exames

exports.createExams = async (req, res) => {
  const { exam_nome, compra, venda } = req.body;
  const { rows } = await db.query(  
    "INSERT INTO exams (exam_nome, compra, venda) VALUES ($1, $2, $3)",
    [exam_nome, compra, venda]
  );
  if (compra > venda) {
    res.status(400).send({ message: "Vai fazer isso mesmo cara?"})
  }

  res.status(201).send({
    message: "Adicionado com sucesso!",
    body: {
      Exame: { exam_nome, compra, venda }
    },
  }) 
};

// Consulta de todos os exames

exports.listAllExams = async (req, res) => {
    const response = await db.query('SELECT exam_nome FROM exams ORDER BY exam_nome ASC');
    res.status(200).send(response.rows);
  };

// Consulta de exames por id

exports.findExamsById = async (req, res) => {
    const ExamsId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM exams WHERE id = $1', [ExamsId]);
    res.status(200).send(response.rows);
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
  