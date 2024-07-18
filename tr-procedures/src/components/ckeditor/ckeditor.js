import {LitElement, html, css} from 'lit';
import './ckeditor-js.js';
import { MyCustomUploadAdapterPlugin } from './ckeditor-upload-plugin';
import { styles } from './ckeditor.css.js';
// import ReadOnlyPlugin from './readOnlyPlugin.js';

export class LitCKEditor extends LitElement {
  static get styles() {
    return styles;
  }
  static data = [];
  
  constructor() {
    super();
    this.editor = null;
  }

  async firstUpdated() {
    try {
      const editorElement = this.shadowRoot.getElementById('editor');
      this.editor = await ClassicEditor.create(editorElement, {
        extraPlugins: [MyCustomUploadAdapterPlugin],
      });
      let myId="&id=10"

      // Temporary API for demonstration
      const response = await fetch('https://platform.trazit.net:8443/TRAZiT-API/app/PlatformAdminAPIqueries?actionName=GET_CKEDITOR_BY_ID&dbName=demo_v0_9_2&procInstanceName=app&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlBST0pFQ1RfUkR8YXBwKmFwcCIsImRiTmFtZSI6ImRlbW9fdjBfOV8yIiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiaW5zcGVjdGlvbl9sb3QqMSotNzA0MjE0NTU2fGluc3RydW1lbnRzKjEqLTEwMzcwNjEzNXxEZW1vKjEqMTc3MjYyMzEyOHxEaXNlYXNlU3R1ZGllcyoxKjE5NzQ3NzE3MzF8bWJfZW0qMSoyMzQyNDI1NDV8c3RvY2sqMSotOTU5NTcyNDc4fG1vbl93YXRlcioxKjIwNTM4MDY4NjV8UmFuZEQqMSoxODk3ODgwNjQ5fGFwcCoxKi0xIiwiZVNpZ24iOiJmaXJtYWRlbW8iLCJ1c2VyREJQYXNzd29yZCI6InRyYXppdCIsInVzZXJNYWlsIjoiTkVXdHJheml0LmluZm9AZ21haWwuY29tIiwidXNlcl9wcm9jZWR1cmVzIjoiW2luc3BlY3Rpb25fbG90LCBpbnN0cnVtZW50cywgRGVtbywgRGlzZWFzZVN0dWRpZXMsIG1iX2VtLCBzdG9jaywgbW9uX3dhdGVyLCBSYW5kRCwgYXBwXSIsImFwcFNlc3Npb25JZCI6Ijg1MjkiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJXZWQgSnVsIDAzIDE4OjEzOjQyIFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.jtJmzS4E9SLB7rY8g1GM8MNHDy_NU1sQJVh1V3d2r04&&isForTesting=false'+myId);
      if (response.ok) {
        const data = await response.json();
        this.editor.setData(data.comment)
        // if (data.body) {
        //   this.editor.setData(data.body);
        // } else {
        //   this.editor.setData(''); // Set blank editor if no data
        // }
      } else {
        console.error('Failed to load data:', response.status);
        this.editor.setData(''); // Set blank editor on error
      }
    } catch (error) {
      console.error('Error initializing editor:', error);
      if (this.editor) {
        this.editor.setData(''); // Set blank editor on error
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.editor) {
      this.editor.destroy();
    }
  }

  async saveData() {
    const form = new FormData();
    if (this.editor) {
      const textValue = this.editor.getData();
      let myArgument='&textValue='+textValue
      // Temporary API for demonstration
      let actionParams={
        actionName: 'UPDATE_TEXT',
        id: 10,
        dbName: 'demo_v0_9_2',
        procInstanceName: 'app',
        finalToken: 'eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlBST0pFQ1RfUkR8YXBwKmFwcCIsImRiTmFtZSI6ImRlbW9fdjBfOV8yIiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiaW5zcGVjdGlvbl9sb3QqMSotNzA0MjE0NTU2fGluc3RydW1lbnRzKjEqLTEwMzcwNjEzNXxEZW1vKjEqMTc3MjYyMzEyOHxEaXNlYXNlU3R1ZGllcyoxKjE5NzQ3NzE3MzF8bWJfZW0qMSoyMzQyNDI1NDV8c3RvY2sqMSotOTU5NTcyNDc4fG1vbl93YXRlcioxKjIwNTM4MDY4NjV8UmFuZEQqMSoxODk3ODgwNjQ5fGFwcCoxKi0xIiwiZVNpZ24iOiJmaXJtYWRlbW8iLCJ1c2VyREJQYXNzd29yZCI6InRyYXppdCIsInVzZXJNYWlsIjoiTkVXdHJheml0LmluZm9AZ21haWwuY29tIiwidXNlcl9wcm9jZWR1cmVzIjoiW2luc3BlY3Rpb25fbG90LCBpbnN0cnVtZW50cywgRGVtbywgRGlzZWFzZVN0dWRpZXMsIG1iX2VtLCBzdG9jaywgbW9uX3dhdGVyLCBSYW5kRCwgYXBwXSIsImFwcFNlc3Npb25JZCI6Ijg1MjkiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJXZWQgSnVsIDAzIDE4OjEzOjQyIFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.jtJmzS4E9SLB7rY8g1GM8MNHDy_NU1sQJVh1V3d2r04',
        textValue: textValue,
        isForTesting: false
      }
      if (actionParams!==undefined){
        Object.keys(actionParams).forEach(key => {
          form.append(key, actionParams[key]);
        });
      }
      // if (APIParams!==undefined){
      //   Object.keys(APIParams).forEach(key => {
      //     form.append(key, APIParams[key]);
      //   });
      // }
      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('show-progress', {
        bubbles: true,
        composed: true
      }));      

      const response = await fetch('http://localhost:8081/TRAZiT-API/app/PlatformAdminAPIactions', {
        method: 'POST',
        body: form,
        credentials: 'same-origin'
      });

      if (response.ok) {
        console.log('Data saved successfully');
        alert('Data saved successfully');
      } else {
        console.error('Failed to save data:', response.status);
      }
      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('hide-progress', {
        bubbles: true,
        composed: true
      }));      

    }
  }
  printContent() {
    if (this.editor) {
      const content = this.editor.getData();
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Print Preview</title>');
      printWindow.document.write('<style>body{font-family: Arial, sans-serif;}</style></head><body>');
      printWindow.document.write(content);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
  render() {
    return html`
    <button @click="${this.printContent}">Print</button>
      <div id="editor"></div>
      <button @click="${this.saveData}">Save</button>
    `;
  }
}

customElements.define('lit-ckeditor', LitCKEditor);