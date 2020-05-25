// requires da aplicação //
const db = require("../config/database");



// Rota para adicionar uma unidade //

exports.createUnid = async (req, res) => {
  const {unid_nome, endereco, telefone, lab_id} = req.body
  const {rows} = await db.query(
    'INSERT INTO unid (unid_nome, endereco, telefone, lab_id) VALUES ($1, $2, $3, $4) RETURNING id',
    [unid_nome, endereco, telefone, lab_id]
  )
  // objeto auxiliar //
  const response = {
    message: "Adicionado com sucesso!",
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
  const response = await db.query('SELECT * from unid ORDER BY unid_nome ASC')
  res.status(200).send(response.rows)
}


// Rota para listar uma unidade pelo id //

exports.findUnidById = async (req, res) => {
  const UnidID = parseInt(req.params.id)
  const response = await db.query('SELECT unid_nome, endereco, telefone from unid WHERE id = $1', [UnidID]);
  res.status(200).send(response.rows)
}

// Rota para atualizar uma unidade pelo id //

exports.updateUnidById = async (req, res) => {
  const id = parseInt(req.params.id)
  const {unid_nome, endereco, telefone} = req.body;

  const response = await db.query(
    'UPDATE unid SET unid_nome = $1, endereco = $2, telefone = $3 WHERE id = $4',
    [unid_nome, endereco, telefone, id]
  );
   res.status(200).send({message: 'Atualizado com sucesso'});
}

// Rota para deletar uma unidade pelo id //

exports.deleteUnidById = async (req, res) => {
    const UnidID = parseInt(req.params.id);
    await db.query('DELETE FROM unid WHERE id = $1', [UnidID]);
    
   res.status(200).send({message: 'Deletado com sucesso!', UnidID}) 
 }