const dropArea = document.getElementById('drop-area');
const fieldsDiv = document.getElementById('fields');
const output = document.getElementById('output');

const tableFields = {
  students: ['id', 'name', 'age'],
  courses: ['id', 'title', 'credits'],
  enrollments: ['student_id', 'course_id', 'grade']
};

let selectedTables = [];
let selectedFields = [];

document.querySelectorAll('.table').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.dataset.table);
  });
});

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.style.borderColor = '#4caf50';
});

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  const table = e.dataTransfer.getData('text/plain');
  if (!selectedTables.includes(table)) {
    selectedTables.push(table);
    renderFields(table);
    const div = document.createElement('div');
    div.textContent = table;
    dropArea.appendChild(div);
  }
});

function renderFields(table) {
  const label = document.createElement('h4');
  label.textContent = `Fields from ${table}`;
  fieldsDiv.appendChild(label);

  tableFields[table].forEach(field => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = `${table}.${field}`;
    checkbox.addEventListener('change', e => {
      if (e.target.checked) {
        selectedFields.push(e.target.value);
      } else {
        selectedFields = selectedFields.filter(f => f !== e.target.value);
      }
    });

    const text = document.createElement('span');
    text.textContent = field;

    const wrapper = document.createElement('div');
    wrapper.appendChild(checkbox);
    wrapper.appendChild(text);
    fieldsDiv.appendChild(wrapper);
  });
}

function generateSQL() {
  if (selectedTables.length === 0 || selectedFields.length === 0) {
    output.textContent = '-- Please select at least one table and one field';
    return;
  }

  let sql = `SELECT ${selectedFields.join(', ')}\nFROM ${selectedTables.join(', ')}`;
  output.textContent = sql;
}
