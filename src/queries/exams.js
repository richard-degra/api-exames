const listAllExamsQuery = 'SELECT * FROM exams ORDER BY exam_nome ASC'
const listByIdQuery = 'SELECT * FROM exams WHERE id = $1'
const createExamQuery = "INSERT INTO exams (exam_nome, compra, venda) VALUES ($1, $2, $3)"
const updateExamQuery = "UPDATE exams SET exam_nome = $1, compra = $2, venda = $3 WHERE id = $4"
const deleteExamQuery = 'DELETE FROM exams WHERE id = $1'
const linkListQuery = 'SELECT * from assoc INNER JOIN unid on assoc.unid_id = unid.lab_id'
const createLinkQuery = 'INSERT INTO assoc (exam_id, unid_id) VALUES ($1, $2)' 

module.exports = {
    listAllExamsQuery,
    listByIdQuery,
    createExamQuery,
    updateExamQuery,
    deleteExamQuery,
    linkListQuery,
    createLinkQuery
}