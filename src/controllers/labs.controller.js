// Requires da aplicação
const db = require('../config/database');

// imports da aplicação 
const { createLabQuery, listAllLabQuery, listByIdQuery, updateByIdQuery, deleteByIdQuery } = require('../queries/labs')

// Validação de labs //

const validateLabs = async (body) => {
  const {lab_nome, cnpj} = body;
  const response = {
    errors: [],
    success: true
  }
  if (lab_nome === '' || lab_nome === undefined || lab_nome === null) {
    response.errors.push('Nome inválido');
    response.success = false;
  }
  if (cnpj === undefined || cnpj === null || cnpj === '' || cnpj === NaN) {
    response.errors.push('CNPJ inválido');
    response.success = false;
  }
  return response 
}


// Rota para criação de um lab //

exports.createLab = async (req, res) => {
  const {lab_nome, cnpj} = req.body

  const validation = await validateLabs (req.body);

  if (validation.success == false) {
    res.status(400).send({ message: validation.errors });
    return;
  }

  const {rows} = await db.query (createLabQuery, [lab_nome, cnpj]);

  res.status(201).send({
      message: 'Adicionado com sucesso',
      body: {
          labs: {lab_nome, cnpj}
      }
  })
};

// rota para listagem dos labs //

exports.listAllLabs = async (req, res) => {
    const response = await db.query(listAllLabQuery);
    res.status(200).send(response.rows);
  };

// rota para listagem dos labs pelo id //

exports.findLabsById = async (req, res) => {
   const LabsID = parseInt(req.params.id);
   const response = await db.query (listByIdQuery, [LabsID]);
   res.status(200).send(response.rows) 
}

// rota para atualizar um lab pelo id //

exports.updateLabsById = async (req, res) => {
   const id = parseInt(req.params.id);
   const {lab_nome, cnpj} = req.body;
   
   const response = await db.query(updateByIdQuery, [lab_nome, cnpj, id]);
   res.status(200).send({message: "Atualizado com sucesso!"})
}

// rota para deletar um lab pelo id //

exports.deleteLabsById = async (req, res) => {
   const LabsID = parseInt(req.params.id);
   await db.query(deleteByIdQuery, [LabsID]);
   
  res.status(200).send({message: 'Deletado com sucesso!', LabsID}) 
}