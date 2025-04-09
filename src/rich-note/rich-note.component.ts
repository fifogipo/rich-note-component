import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import boldIcon from "/icons/bold.svg?raw";
import iconsIcon from "/icons/icons.svg?raw";
import imageIcon from "/icons/image.svg?raw";
import tableIcon from "/icons/table.svg?raw";
import italicIcon from "/icons/italic.svg?raw";
import alignLeftIcon from "/icons/align-left.svg?raw";
import alignCenterIcon from "/icons/align-center.svg?raw";
import alignRightIcon from "/icons/align-right.svg?raw";
import alignJustifyIcon from "/icons/align-justify.svg?raw";
import underlineIcon from "/icons/underline.svg?raw";

import styles from "./rich-note.component.css?inline";

@customElement("rich-note-component")
export class RichNoteComponent extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  // Input properties
  @property({ type: String }) title: string = "";
  @property({ type: String }) content: string = "";
  @property({ type: Boolean }) disableLeftBorder: boolean = false;

  // Internal DOM selectors
  @query("#editor") editorRef!: HTMLDivElement;
  @query("#toolbar") toolbarRef!: HTMLDivElement;

  // Active formatting state
  @state() private activeFormattingState = {
    isBoldActive: false,
    isItalicActive: false,
    isUnderlineActive: false,
    isAlignLeftActive: false,
    isAlignCenterActive: false,
    isAlignRightActive: false,
    isAlignJustifyActive: false,
  };

  // Lifecycle: update component when properties change
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("disableLeftBorder")) {
      this.style.borderLeft = this.disableLeftBorder ? "none" : "1px solid var(--border-divider)";
      this.toolbarRef.style.borderRadius = this.disableLeftBorder ? "0 8px 0 0" : "8px 8px 0 0";
    }
  }

  // Update active formatting state by checking document commands
  updateActiveFormattingState = (): void => {
    this.activeFormattingState = {
      isBoldActive: document.queryCommandState("bold"),
      isItalicActive: document.queryCommandState("italic"),
      isUnderlineActive: document.queryCommandState("underline"),
      isAlignLeftActive: document.queryCommandState("justifyLeft"),
      isAlignCenterActive: document.queryCommandState("justifyCenter"),
      isAlignRightActive: document.queryCommandState("justifyRight"),
      isAlignJustifyActive: document.queryCommandState("justifyFull"),
    };
  };

  // Event Handler
  handleTitleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.title = input.value;
  }

  handleEditorInput() {
    this.content = this.editorRef.innerHTML;
    this.dispatchEvent(
      new CustomEvent("note-saved", {
        detail: { title: this.title, content: this.content },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Commands for the Editor
  executeEditorCommand(command: string) {
    this.editorRef.focus();
    document.execCommand(command, false, "");
    this.updateActiveFormattingState();
  }

  alignText(alignment: string) {
    this.editorRef.focus();
    document.execCommand("justify" + alignment);
    this.updateActiveFormattingState();
  }

  // Insertions: Emoji, Image, Table
  handleIEmojiInsert() {
    this.editorRef.focus();
    const emoji = prompt("Insert an emoji (for ex. 😊, 😂, 😍):");
    if (emoji) {
      document.execCommand("insertText", false, emoji);
    }
  }

  handleImageInsert(): void {
    this.editorRef.focus();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      this.handleFileInput(file, (result: string) => {
        const imgEl = document.createElement("img");
        imgEl.style.maxWidth = "100%";
        imgEl.src = result;
        this.editorRef.appendChild(imgEl);
      });
    };
    fileInput.click();
  }

  handleImageDrop(e: DragEvent): void {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    this.handleFileInput(file, (result: string) => {
      const imgEl = document.createElement("img");
      imgEl.style.maxWidth = "100%";
      imgEl.src = result;
      this.editorRef.appendChild(imgEl);
    });
  }

  handleTableInsert() {
    this.editorRef.focus();
    const rows = prompt("Number of rows:", "2");
    const cols = prompt("Number of columns:", "2");
    if (rows && cols) {
      const tableHTML = this.createTableHTML(parseInt(rows), parseInt(cols));
      document.execCommand("insertHTML", false, tableHTML);
    }
  }

  // Utility: Managment file and creation Table
  createTableHTML(rows: number, cols: number): string {
    let table = '<table border="1" style="border-collapse: collapse;">';
    for (let i = 0; i < rows; i++) {
      table += "<tr>";
      for (let j = 0; j < cols; j++) {
        table += '<td style="padding: 4px;">&nbsp;</td>';
      }
      table += "</tr>";
    }
    table += "</table><br>";
    return table;
  }

  private handleFileInput(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  render() {
    const formatButtonClasses = (isActive: boolean) => classMap({ active: isActive });

    return html`
      <div
        id="toolbar"
        class="toolbar"
      >
        <div class="toolbar-section">
          <button
            id="bold"
            title="Bold"
            class="${formatButtonClasses(this.activeFormattingState.isBoldActive)}"
            @click=${() => this.executeEditorCommand("bold")}
          >
            ${unsafeHTML(boldIcon)}
          </button>
          <button
            id="italic"
            title="Italic"
            class="${formatButtonClasses(this.activeFormattingState.isItalicActive)}"
            @click=${() => this.executeEditorCommand("italic")}
          >
            ${unsafeHTML(italicIcon)}
          </button>
          <button
            id="underline"
            title="Underline"
            class="${formatButtonClasses(this.activeFormattingState.isUnderlineActive)}"
            @click=${() => this.executeEditorCommand("underline")}
          >
            ${unsafeHTML(underlineIcon)}
          </button>
        </div>
        <div class="toolbar-divider"></div>
        <div class="toolbar-section">
          <button
            id="align-left"
            title="Align Left"
            class="${formatButtonClasses(this.activeFormattingState.isAlignLeftActive)}"
            @click=${() => this.alignText("Left")}
          >
            ${unsafeHTML(alignLeftIcon)}
          </button>
          <button
            id="align-center"
            title="Align Center"
            class="${formatButtonClasses(this.activeFormattingState.isAlignCenterActive)}"
            @click=${() => this.alignText("Center")}
          >
            ${unsafeHTML(alignCenterIcon)}
          </button>
          <button
            id="align-right"
            title="Align Right"
            class="${formatButtonClasses(this.activeFormattingState.isAlignRightActive)}"
            @click=${() => this.alignText("Right")}
          >
            ${unsafeHTML(alignRightIcon)}
          </button>
          <button
            id="align-full"
            title="Align Justify"
            class="${formatButtonClasses(this.activeFormattingState.isAlignJustifyActive)}"
            @click=${() => this.alignText("Full")}
          >
            ${unsafeHTML(alignJustifyIcon)}
          </button>
        </div>
        <div class="toolbar-divider"></div>
        <div class="toolbar-section">
          <button
            id="emoji"
            title="Insert Emoji"
            @click=${this.handleIEmojiInsert}
          >
            ${unsafeHTML(iconsIcon)}
          </button>
          <button
            id="image"
            title="Insert Image"
            @click=${this.handleImageInsert}
          >
            ${unsafeHTML(imageIcon)}
          </button>
          <button
            id="table"
            title="Insert Table"
            @click=${this.handleTableInsert}
          >
            ${unsafeHTML(tableIcon)}
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Title"
        .value=${this.title}
        @input=${this.handleTitleInput}
      />
      <hr />
      <div
        id="editor"
        contenteditable="true"
        data-placeholder="Write here the note..."
        .innerHTML=${this.content}
        @drop=${this.handleImageDrop}
        @dragover=${(e: DragEvent) => e.preventDefault()}
        @input=${this.handleEditorInput}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rich-note-component': RichNoteComponent
  }
}