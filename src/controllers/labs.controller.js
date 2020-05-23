// Requires da aplicação
const db = require("../config/database");

// Validação de labs //

const validateLabs = async (body) => {
  const {lab_nome, cnpj} = body;
  const response = {
    errors: [],
    success: true
  }
  if (lab_nome === '') {
    response.errors.push('Nome do laboratório não pode ficar em branco');
    response.success = false;
  }
  if (cnpj === '') {
    response.errors.push('CNPJ não pode ficar em branco');
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

  const {rows} = await db.query (
    "INSERT INTO labs (lab_nome, cnpj) VALUES ($1, $2)",
    [lab_nome, cnpj]  
  );

  res.status(201).send({
      message: "Adicionado com sucesso",
      body: {
          labs: {lab_nome, cnpj}
      }
  })
};

// rota para listagem dos labs //

exports.listAllLabs = async (req, res) => {
    const response = await db.query('SELECT lab_nome, cnpj FROM labs ORDER BY lab_nome ASC');
    res.status(200).send(response.rows);
  };

// rota para listagem dos labs pelo id //

exports.findLabsById = async (req, res) => {
   const LabsID = parseInt(req.params.id);
   const response = await db.query ('SELECT lab_nome, cnpj from labs WHERE id = $1', [LabsID]);
   res.status(200).send(response.rows) 
}

// rota para atualizar um lab pelo id //

exports.updateLabsById = async (req, res) => {
   const id = parseInt(req.params.id);
   const {lab_nome, cnpj} = req.body;
   
   const response = await db.query('UPDATE labs SET lab_nome = $1, cnpj = $2 WHERE id = $3',
    [lab_nome, cnpj, id]
   );
   res.status(200).send({message: "Atualizado com sucesso!"})
}

// rota para deletar um lab pelo id //

exports.deleteLabsById = async (req, res) => {
   const LabsID = parseInt(req.params.id);
   await db.query('DELETE FROM labs WHERE id = $1', [LabsID]);
   
  res.status(200).send({message: 'Deletado com sucesso!', LabsID}) 
}