# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under a category, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes (up to 200 characters) with a category: Personal, Work or Study
- Each note shows its text, category, date and time, and a Delete button
- Colour-coded note cards for each category
- Validation with clear error messages for empty or too-long notes
- Live search that ignores upper and lower case
- A note counter: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes saved with localStorage so they survive a page refresh
- "Clear all" button with a confirmation prompt
- Responsive layout that stacks the form on small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/your-username/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Open `index.html` in your browser (or use the Live Server extension in VS Code).

No installation or build step is needed.

## What I learned

- How to build a page with semantic HTML (`header`, `main`, `section`, `footer`) and link labels to inputs.
- How to keep notes in an array of objects and rebuild the list with a `render()` function using `createElement` and `textContent`, which keeps user text safe.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use Flexbox and a media query to make a layout work on small screens.
- How to make small, meaningful Git commits as each feature is finished.
