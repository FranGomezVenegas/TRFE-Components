import { css } from "lit";

export const styles = css`
:host {

}
.sellect-container {
    border: 1px solid #ccc;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: 5px;
    position: relative;
    background: #efefef;
}

.sellect-container-readonly {
    border: none;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: -5px;
    position: relative;
    background: #efefef;
}


.sellect-destination-list {
    display: inline-block;
}

.sellect-destination-list .sellect-item {
    padding-top: 3px;
    padding-bottom: 0;
    font-size: 11px;
}

.sellect-destination-list .sellect-item {
    margin: 2px -2px 2px 0;
    background-color: #e5e5e5;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 2px;
    padding: 0px 5px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    color: rgb(19, 11, 111);
    background-color: #8DDDF4;    
}

.sellect-destination-list .sellect-item .sellect-close-icon {
    margin-left: 5px;
}

.sellect-element {
    border: none;
    height: 18px;
    background: none;
}

.sellect-element:focus-visible {
    outline-offset: 0px;
    outline: none;
}

.sellect-origin-list.open {
    max-height: 138px;
    opacity: 1;
}

.sellect-origin-list {
    overflow: auto;
    max-height: 0;
    opacity: 0;
    transition: opacity 1.1s ease, max-height .2s ease;
}

.sellect-origin-list .sellect-item {
    display: block;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    margin-right: 5px;
}

.sellect-arrow-icon {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    padding: 8px;
    transform: translateY(-3px);
}

.first {
    color: gray;
    position: absolute;
    font-size: 14px;
    top: 8px;
}

.second {
    top: 0px;
    left: -12px;
    position: absolute;
    transform: scale(0.8);
    color: #18a4fe;
}

label {
    padding: 0px 8px;
    transition: all 0.2s;
}
`