import { html } from 'lit-element';
import '@material/mwc-icon';

export const template = (props) => {
    let cols = [], rows = [];
    for(let i = 0; i < props.data.cols; i++) {
        cols.push(i);
    }

    let letter = "A";
    for(let i = 0; i < props.data.rows; i++) {
        rows.push(String.fromCharCode(letter.charCodeAt(0) + (i)));
    }
    let activeData = null;
    return html`
        <div style="width: fit-content; gap: 4px; display: flex; flex-direction: column;">
            <div style="display:flex; justify-content: space-between;"> 
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                    <mwc-icon style="color:#54CCEF; cursor:pointer;"> content_copy </mwc-icon>
                    <div class="view-btn ${props.viewMode == 1 ? "active" : ""}" @click=${() => props.setViewMode(1)}> Box View </div>
                    <div class="view-btn ${props.viewMode == 2 ? "active" : ""}" @click=${() => props.setViewMode(2)}> List View </div>
                </div>
                <div class="accept-btn"> Accept </div>
            </div>
            <div class="box-content">
                ${props.viewMode == 1 ? html `
                <div> 
                    <div class="row-content"> 
                        <div class="first-item"> </div>
                        ${cols.map((colN, i) => html `
                        <div class="col-num"> ${colN + 1} </div>
                        `)}
                    </div>
                    ${rows.map((rowN ,i) => html `
                    <div class="row-content"> 
                        <div class="row-num"> ${rowN} </div>
                        ${cols.map((item1 ,j) => html `
                        <div class="box ${props.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" @click=${() => props.setSelectBoxIndex(rowN + (j + 1), i * cols.length + (j + 1))} @dragover=${(e) => props.allowDrop(e)} @drop=${(e) => props.dropBox(e)}> 
                            <div draggable="true"  @dragstart=${(e) => props.dragBox(e)} class="draggable-box">
                                <div class="data-view">
                                    ${props.data.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.cols) == i * cols.length + (j + 1)) ? props.data.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.cols) == i * cols.length + (j + 1)).name : html `<div class="add-circle"> + </div>`}
                                </div>
                                <div class="position">
                                    <span> ${rowN + (j + 1)} </span>
                                    <span> ${ i * cols.length + (j + 1) } </span>
                                </div>
                            </div>
                        </div>
                        `)}
                    </div>
                    `)}
                    <div style="display:flex; justify-content: center;">
                        ${props.selectedIndex1 ? html `<div class="selected-cell-content"> Cell selected: ${props.selectedIndex1} </div>` : null} 
                    </div>
                    ${props.selectedIndex2 ? html `<div style="text-align: center; color: white;"> ${props.selectedIndex2}:Sample box </div>` : null} 
                </div>
                ` : 

                props.data.datas.length > 0 ?
                html `
                <div style="width:${80 * props.data.cols}px; min-width:470px;">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Name</th>
                                <th>Vol</th>
                                <th>Stor.comments</th>
                                <th>Description</th>
                                <th>Date created</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${props.data.datas.map((data, i) => html`
                            <tr>
                                <td>${ String.fromCharCode(data.posY + 64) + data.posX}</td>
                                <td>${data.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>${data.stored_on}</td>
                            </tr>
                            `)}
                        </tbody>
                    </table>
                </div>
                ` : 
                null}
            </div>
        </div>
    `;
};

// <div class="add-circle"> + </div>
