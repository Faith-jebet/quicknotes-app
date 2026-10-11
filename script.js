const MAX_LENGTH = 200;

const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');

let notes = [];

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

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
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    meta.append(category, date, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  });

  updateCount();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  });

  noteInput.value = '';
  render();
});

render();
