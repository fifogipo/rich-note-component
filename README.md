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
  <script type="module" src="./path/to/rich-note-component.js"></script>
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

## Using with React

You can also use the **rich-note-component** in a React project by following these steps:

### 1. Install Dependencies

First, install the component and necessary dependencies:

```bash
npm install rich-note-component
npm install @lit-labs/react react
```

### 2. Create a Wrapper for React

Use the `createComponent` function from `@lit-labs/react` to create a React-friendly wrapper for the Lit component.

```tsx
import { createComponent } from '@lit/react';
import * as React from 'react';
import { RichNoteComponent } from 'rich-note-component'; //import lit component

// Create wrapper component
const RichNoteWrapper = createComponent({
  displayName: 'RichNoteComponent',
  tagName: 'rich-note-component',
  elementClass: RichNoteComponent,
  react: React,
  events: {
    'note-saved': 'onNoteSaved'
  }
});
```

### 3. Use the Component in Your React App

You can now use `RichNoteComponentWrapper` like a regular React component:

```tsx
import React from 'react';
import { RichNoteComponentWrapper } from './RichNoteWrapper';

function App() {
  const handleNoteSaved = (e: CustomEvent) => {
    console.log('Note saved:', e.detail);
  };

  return (
    <div>
      <RichNoteComponentWrapper
        title="My Note"
        content="<p>Start editing...</p>"
        onNoteSaved={handleNoteSaved}
      />
    </div>
  );
}

export default App;
```

## Using with Angular

You can also use the **rich-note-component** in an Angular project by following these steps:

### 1. Install Dependencies

First, install the component and necessary dependencies:

```bash
npm install rich-note-component
npm install @angular/elements
```

### 2. Register the Custom Element

In your Angular project, you'll need a module to register the `rich-note-component` as a custom element.

Create a new file `app/element-registrations.ts`:

```ts
import { defineCustomElement } from '@angular/elements';
import { RichNoteComponent } from 'rich-note-component';

// Register the custom element
const richNoteElement = defineCustomElement(RichNoteComponent, {});
customElements.define('rich-note-component', richNoteElement);
```

### 3. Add the Custom Element to Angular

In your `app.module.ts`, import the `element-registrations.ts` and make sure the custom element is initialized correctly.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import './element-registrations'; // Import element registration

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. Using the Component in Angular Templates

Now, you can use the `rich-note-component` directly in your Angular templates:

```html
<rich-note-component 
  title="My Note" 
  content="<p>Start editing...</p>"
  (note-saved)="onNoteSaved($event)">
</rich-note-component>
```

### 5. Handling the Custom Event in Angular

In your Angular component (e.g., `app.component.ts`), define the method to handle the `note-saved` event:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onNoteSaved(event: CustomEvent) {
    console.log('Note saved:', event.detail);
  }
}
```

---

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

---

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

This project is distributed under the MIT License. See the [LICENSE](./LICENSE) file for more details.