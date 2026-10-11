const MAX_LENGTH = 200;
const STORAGE_KEY = 'quicknotes-notes';

const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearAllBtn = document.querySelector('#clear-all');

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

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
  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(term)
  );

  notesList.textContent = '';

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'no-results';
    empty.textContent = 'No notes match your search.';
    notesList.appendChild(empty);
  }

  visibleNotes.forEach((note) => {
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
  saveNotes();
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

  saveNotes();
  noteInput.value = '';
  render();
});

searchInput.addEventListener('input', render);

clearAllBtn.addEventListener('click', () => {
  if (notes.length === 0) {
    return;
  }

  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
