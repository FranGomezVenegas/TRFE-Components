# \<tr-procedures>
Component core for procedures elements with dynamic model

This v2 is a refactor of v1 then no new features are added but trying to reduce the number of lines and even harmonize some areas where naming is not clear taking advantage the v1 was completed

## Installation

```bash
./install.sh
```

## Local Demo with `web-dev-server`

```bash
npm run start
```

## Versioning track

v0.0.1 model up to 2.0
v0.0.2 model 2.1
v0.1.0 QA cleaning, sonarcloud
v0.2.1 multilist default values
v0.2.2 fix issue when clicking one rowButton having the children open
v0.2.3 dropzone to upload file, preview duplicated page preview fixed
v0.2.4 improved file attachments dialog
v0.2.5 readOnlyTable, let cell be edited directly having one action linked and moving the focus to the next row,same column.
v0.2.6 Fix for tables disappearing when clicking on it and for tabs
v0.2.7 Styling, thin padding for th and td
v0.2.8 Styling applied same style from specLimitsQuantitative to cell edit for tables and Enter Results dialog
v0.2.9 avoid is_locked when undefined in grid_with_buttons and button to display/hide cards
v0.2.10 lock/unlock action for procedures
v0.2.11 Disabledd jsonDiffViewer
v0.2.12 Run the refreshMasterData just in case of request status 200 and the response contains master_data property
v0.2.13 [- #369. Reset Fields one action performed](https://github.com/FranGomezVenegas/FrontE-Issues/issues/369)
v0.2.14 Proc-definition main cards view compatible with confirm dialogs, added serialPort and TrackWise Integrity to prototype
v0.2.15 fix for reset values when selecting entries from one list element
v0.2.16 Integrated some dev solutions into the master
v0.2.17 vaadin-grid for grid-with-buttons, header backgroundcolor white and height 65vh
v0.2.18 fix for trazit form filters
v0.2.19 draft for flipcard

This area want to track the requirements that made this web component to become a reality.

[- #196. Check Mandatory Fields not filled](https://github.com/FranGomezVenegas/FE-Issues/issues/196)
[- #197. Reset Fields one action performed](https://github.com/FranGomezVenegas/FE-Issues/issues/197)
[- #198. Not allowed negative numDays for Reactivate Dialog](https://github.com/FranGomezVenegas/FE-Issues/issues/198)
[- #199. Buttons 'buttonForQuery' was enabling the button always even when no record selected](https://github.com/FranGomezVenegas/FE-Issues/issues/199)

## Fixed Bugs Tracking

This area want to track the bugs identified for this Web Component that were already implemented/fixed.
[- #201. Buttons 'ButtonHide' property name hideWhen.... not hidWhen....typo](https://github.com/FranGomezVenegas/FE-Issues/issues/201)

[- #927. 2023-Sep-05 Issue for open and remove attachments within genericDialog](https://github.com/FranGomezVenegas/FETR/issues/927)

[- #930. 2023-Sep-05 default value when element is not present(null) within genericDialog](https://github.com/FranGomezVenegas/FETR/issues/930)

[- #929. 2023-Sep-06 buttonFunction when running dialog queries had bad variable reference](https://github.com/FranGomezVenegas/FETR/issues/929)

[- #929. 2023-Sep-06 Open and remove attachments dialog generating loop endpoints call, the logic should be in ButtonFunctions and not in TrazitGenericDialog itself](https://github.com/FranGomezVenegas/FETR/issues/929)

[- #927. 2023-Sep-07 Issue for removing attachments within genericDialog, the grid parameter not added to the API request, fixed.](https://github.com/FranGomezVenegas/FETR/issues/927)

[- #324. 2024-Apr-16 Arrows in the procedure management are not working properly after clicking its title](https://github.com/FranGomezVenegas/FrontE-Issues/issues/324)


