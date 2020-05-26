const createLabQuery = 'INSERT INTO labs (lab_nome, cnpj) VALUES ($1, $2)'
const listAllLabQuery = 'SELECT lab_nome, cnpj FROM labs ORDER BY lab_nome ASC'
const listByIdQuery = 'SELECT * from labs WHERE id = $1'
const updateByIdQuery = 'UPDATE labs SET lab_nome = $1, cnpj = $2 WHERE id = $3'
const deleteByIdQuery = 'DELETE FROM labs WHERE id = $1'

module.exports = {
    createLabQuery,
    listAllLabQuery,
    listByIdQuery,
    updateByIdQuery,
    deleteByIdQuery
}