export function PrintableTable(base) {
    return class extends (base) {
      
          printTable() {            
            this.setPrintContentTable()
            let printWindow = window.open('', '_blank');
            printWindow.document.write(this.printObj.contentWithFooter);
            printWindow.document.title = 'Title Hear';
            setTimeout(function () {
              printWindow.print();
              printWindow.close();
            }, 500);
          }         
      
          setPrintContentTable() {  
            const dataTable = this._getTablesHTML('objecttabs-composition', '#mainDiv');
        
            this.printObj = {
                header: '.',
                content: headerData,
                contentWithFooter: `
                    <html>
                        <head></head>
                        <body>
                            <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">
                                ${dataTable}
                            </div>
                        </body>
                    </html>
                `
            };
        }
        
        _getOuterHTML(selector) {
            const element = this.shadowRoot.querySelector(selector);
            return element ? element.outerHTML : '';
        }
        
        _getTablesHTML(componentSelector, mainDivSelector) {
            const compositionObj = this.shadowRoot.querySelector(componentSelector);
            if (!compositionObj) {
                console.error(`${componentSelector} not found.`);
                return '';
            }
        
            const mainContent = compositionObj.shadowRoot ? compositionObj : this;
            const mainDiv = mainContent.shadowRoot.querySelector(mainDivSelector);
        
            if (!mainDiv) {
                console.error(`${mainDivSelector} not found.`);
                return '';
            }
        
            const tables = mainDiv.querySelectorAll('table');
            if (!tables.length) {
                console.error('No tables found.');
                return '';
            }
        
            let tablesHTML = '';
            tables.forEach(table => {
                const clonedTable = table.cloneNode(true);
                const headers = clonedTable.querySelectorAll('th');
                let actionsColumnIndex = -1;
        
                headers.forEach((header, index) => {
                    if (header.textContent.trim() === "Actions") {
                        actionsColumnIndex = index;
                    }
                });
        
                if (actionsColumnIndex !== -1) {
                    headers[actionsColumnIndex].remove();
                    const rows = clonedTable.querySelectorAll('tr');
                    rows.forEach(row => {
                        if (row.cells.length > actionsColumnIndex) {
                            row.deleteCell(actionsColumnIndex);
                        }
                    });
                }
        
                tablesHTML += clonedTable.outerHTML;
            });
        
            return tablesHTML;
        }
          
    }
}