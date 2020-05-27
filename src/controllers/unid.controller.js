// requires da aplicação //
const db = require("../config/database");

// imports da aplicação 

const { createUnidQuery, listAllUnidQuery, listByIdQuery, updateByIdQuery, deleteByIdQuery } = require('../queries/unid')

// Validação da aplicação //

const validateUnids = async (body) => {
  const {unid_nome, endereco, telefone, lab_id} = body;
  const response = {
    errors: [],
    success: true
  }
  if(unid_nome === '' || unid_nome === undefined || unid_nome === null) {
    response.errors.push('Nome da unidade inválido')
    response.success = false;
  }
  if (endereco === '' || endereco === undefined || endereco === null) {
    response.errors.push('Endereço inválido')
    response.success = false;
  }
  if (telefone === '' || telefone === undefined || telefone === NaN) {
    response.errors.push('Telefone inválido')
    response.success = false;
  }
}


// Rota para adicionar uma unidade //

exports.createUnid = async (req, res) => {
  const {unid_nome, endereco, telefone, lab_id} = req.body
  const {rows} = await db.query(createUnidQuery, [unid_nome, endereco, telefone, lab_id])
  
  // objeto auxiliar //
  const response = {
    message: 'Adicionado com sucesso!',
    body: {
       id: rows[0].id,
       name: unid_nome,
       address: endereco,
       telephone: telefone,
    }


  }
  res.status(201).send(response);
}


// Rota para listar todas as unidades //

exports.listAllUnid = async (req, res) => {
  const response = await db.query(listAllUnidQuery)
  res.status(200).send(response.rows)
}


// Rota para listar uma unidade pelo id //

exports.findUnidById = async (req, res) => {
  const UnidID = parseInt(req.params.id)
  const response = await db.query(listByIdQuery, [UnidID]);
  res.status(200).send(response.rows)
}

// Rota para atualizar uma unidade pelo id //

exports.updateUnidById = async (req, res) => {
  const id = parseInt(req.params.id)
  const {unid_nome, endereco, telefone} = req.body;

  const response = await db.query(updateByIdQuery, [unid_nome, endereco, telefone, id]);
   res.status(200).send({message: 'Atualizado com sucesso'});
}

// Rota para deletar uma unidade pelo id //

exports.deleteUnidById = async (req, res) => {
    const UnidID = parseInt(req.params.id);
    await db.query(deleteByIdQuery, [UnidID]);
    
   res.status(200).send({message: 'Deletado com sucesso!', UnidID}) 
 }