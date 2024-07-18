import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

class ReadOnlyEditing extends Plugin {
  init() {
    const editor = this.editor;

    // Conversion from view to model
    editor.model.schema.extend('$text', { allowAttributes: 'readOnly' });

    editor.conversion.for('upcast').elementToAttribute({
      view: {
        name: 'span',
        classes: 'readonly'
      },
      model: 'readOnly'
    });

    // Conversion from model to view
    editor.conversion.for('downcast').attributeToElement({
      model: 'readOnly',
      view: (attributeValue, writer) => {
        if (attributeValue) {
          return writer.createAttributeElement('span', { class: 'readonly' }, { priority: 5 });
        }
        return writer.createAttributeElement('span', {});
      }
    });
  }
}

class ReadOnlyUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    // The "readOnly" button must be registered among the UI components of the editor
    editor.ui.componentFactory.add('readOnly', locale => {
      const command = editor.commands.get('readOnly');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Read Only'),
        withText: true,
        tooltip: true
      });

      // Bind the state of the button to the command
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked
      this.listenTo(buttonView, 'execute', () => editor.execute('readOnly'));

      return buttonView;
    });
  }
}

export default class ReadOnlyPlugin extends Plugin {
  static get requires() {
    return [ReadOnlyEditing, ReadOnlyUI];
  }
}
