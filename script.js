const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');

let notes = [];

function render() {
  notesList.textContent = '';

  notes.forEach((note) => {
    const li = document.createElement('li');
    li.className = `note category-${note.category.toLowerCase()}`;

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const category = document.createElement('span');
    category.className = 'note-category';
    category.textContent = note.category;

    const date = document.createElement('span');
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'note-delete';
    deleteBtn.textContent = 'Delete';

    meta.append(category, date, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = '';
  render();
});

render();
