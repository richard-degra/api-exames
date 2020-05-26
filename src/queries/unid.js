const createUnidQuery = 'INSERT INTO unid (unid_nome, endereco, telefone, lab_id) VALUES ($1, $2, $3, $4) RETURNING id'
const listAllUnidQuery = 'SELECT * from unid ORDER BY unid_nome ASC'
const listByIdQuery = 'SELECT unid_nome, endereco, telefone from unid WHERE id = $1'
const updateByIdQuery = 'UPDATE unid SET unid_nome = $1, endereco = $2, telefone = $3 WHERE id = $4'
const deleteByIdQuery = 'DELETE FROM unid WHERE id = $1'

module.exports = {
    createUnidQuery,
    listAllUnidQuery,
    listByIdQuery,
    updateByIdQuery,
    deleteByIdQuery
}