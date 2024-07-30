export function PrintableTable(base) {
    return class extends (base) {

        printTables() {
            this.setPrintContentTables();
            let printWindow = window.open('', '_blank');
            printWindow.document.write(this.printObj.contentWithFooter);
            printWindow.document.title = 'Title Here';
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 500);
        }

        setPrintContentTables() {
            const dataTables = this._getTablesHTML();

            this.printObj = {
                header: '.',
                contentWithFooter: `
                    <html>
                        <head></head>
                        <body>
                            <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">
                                ${dataTables}
                            </div>
                        </body>
                    </html>
                `
            };
        }

        _getTablesHTML() {
            const tables = this.shadowRoot.querySelectorAll('table');
            if (tables.length === 0) {
                console.error(`No tables found in objecttabs-composition.`);
                return '';
            }

            let combinedTablesHTML = '';
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

                combinedTablesHTML += clonedTable.outerHTML;
            });

            return combinedTablesHTML;
        }
    }
}
