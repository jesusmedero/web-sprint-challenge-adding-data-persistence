const db = require('../../data/dbConfig');

async function getAll() {
  const rows = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    );

  return rows.map(row => ({
    ...row,
    task_completed: !!row.task_completed 
  }));
}


async function add(task) {
  const [task_id] = await db('tasks').insert(task);
  return db('tasks').where({ task_id }).first();
}

module.exports = {
  getAll,
  add,
};
