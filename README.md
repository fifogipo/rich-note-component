# rich-note-component

**rich-note-component** is a web component built with Lit that allows users to create and edit rich notes. It supports advanced text formatting, as well as the insertion of emojis, images (via file upload or drag & drop), and tables.

## Features

- **Text Formatting:** Apply bold, italic, and underline styles.
- **Text Alignment:** Manage text alignment (left, center, right, justify).
- **Dynamic Insertions:** Insert emojis, images, and tables directly within the editor.
- **Customization:** Set an initial title and content, and adjust styles (e.g., disable left border).
- **Custom Events:** The component emits a `note-saved` event whenever the content is updated.

## Installation

To install the component via npm, run:

```bash
npm install rich-note-component
```

Also, ensure you have the `lit` dependency installed:

```bash
npm install lit
```

## Usage

### Importing

Import the component into your project to register the custom element:

```js
import 'rich-note-component';
```

### Adding to HTML

Once imported, you can use the component directly in your HTML markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>rich-note-component Demo</title>
  <script type="module" src="./path/to/your-bundle.js"></script>
</head>
<body>
  <rich-note-component></rich-note-component>
</body>
</html>
```

### Configuring via Attributes

The component accepts several attributes for customization:

- `title`: (String) Initial title for the note.
- `content`: (String) Initial HTML content for the note.
- `disableLeftBorder`: (Boolean) When set, it removes the left border of the component.

Example:

```html
<rich-note-component 
  title="My Note" 
  content="<p>Initial content...</p>" 
  disableLeftBorder>
</rich-note-component>
```

## API and Events

### Properties

- **title** (`String`): Sets the note title.
- **content** (`String`): Manages the HTML content of the note.
- **disableLeftBorder** (`Boolean`): Adjusts the component style by removing the left border.

### Events

- **note-saved:**  
  Emitted when the user updates the content.  
  The event's `detail` includes:
    - `title`: The updated title.
    - `content`: The updated HTML content.

## Development and Customization

The component is developed using Lit and employs custom CSS. You can override CSS variables to adapt the component's appearance to your project. For example:

```css
rich-note-component {
  --border-divider: #ccc;
  --primary-color: #0078d4;
}
```

## Contributing

Bug reports and feature suggestions are always welcome. To contribute:

1. **Fork** the repository.
2. Create a new branch for your feature:  
   `git checkout -b feature/your-feature-name`
3. Commit and push your changes.
4. Open a **pull request**.

## License

This project is distributed under the MPL 2.0 License. See the [LICENSE](./LICENSE) file for more details.