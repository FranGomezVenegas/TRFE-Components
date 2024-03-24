export const ProcManagement = 
[
  {
    "name": "URS",
    "title": {
      "label_en": "Definition",
      "label_es": "Definición"
    },
    "expanded": false,
    "tabs": [
      {
        "name": "USER_AND_ROLES",
        "tabLabel_en": "1) USERS AND ROLES",
        "tabLabel_es": "1) USUARIOS Y PERFILES",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.1) Roles",
                "label_es": "1.1) Perfiles"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "procedure_roles",
              "columns": [
                {
                  "name": "role_name",
                  "label_en": "Role",
                  "label_es": "Perfil"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "REMOVE_ROLE",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "person_remove",
                    "title": {
                      "label_en": "Remove role",
                      "label_es": "Borrar perfil"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "roleName",
                      "selObjectPropertyName": "role_name"
                    }
                  ]
                },
                {
                  "actionName": "RENAME_ROLE",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Rename role",
                      "label_es": "Renombrar perfil"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New Role Name",
                          "label_es": "Nuevo Nombre Perfil",
                          "selObjectPropertyName": "role_name"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "roleName",
                      "selObjectPropertyName": "role_name"
                    },
                    {
                      "argumentName": "newroleName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "actionName": "CLONE_ROLE",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "file_copy",
                    "title": {
                      "label_en": "Clone Role",
                      "label_es": "Clonar Perfil"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New Role Name",
                          "label_es": "Nuevo Nombre de Perfil",
                          "selObjectPropertyName": "role_name"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "roleName",
                      "selObjectPropertyName": "role_name"
                    },
                    {
                      "argumentName": "newroleName",
                      "element": "text1"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_ROLE",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "person_add",
                    "title": {
                      "label_en": "Assign Role",
                      "label_es": "Asignar Perfil"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "dialogWidth": "500px",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New Role name",
                          "label_es": "Nuevo Nombre de Perfil"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "roleName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.2) Users",
                "label_es": "1.2) Usuarios"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "procedure_users",
              "columns": [
                {
                  "name": "user_name",
                  "label_en": "User",
                  "label_es": "Usuario"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "REMOVE_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "person_remove",
                    "title": {
                      "label_en": "Remove user",
                      "label_es": "Borrar usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "selObjectPropertyName": "user_name"
                    }
                  ]
                },
                {
                  "actionName": "RENAME_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Rename user",
                      "label_es": "Renombrar usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New User Name",
                          "label_es": "Nombre nombre de usuario",
                          "selObjectPropertyName": "user_name"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "selObjectPropertyName": "user_name"
                    },
                    {
                      "argumentName": "newuserName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "person_add",
                    "title": {
                      "label_en": "Assign User",
                      "label_es": "Asignar Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "User to assign",
                          "label_es": "Usuario a asignar"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.3) User Roles",
                "label_es": "1.3) Roles de usuario"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "procedure_user_role",
              "columns": [
                {
                  "name": "user_name",
                  "label_en": "User",
                  "label_es": "Usuario"
                },
                {
                  "name": "role_name",
                  "label_en": "Role",
                  "label_es": "Perfil"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "REMOVE_ROLE_TO_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "person_remove",
                    "title": {
                      "label_en": "Remove User Role",
                      "label_es": "Borrar Perfil de Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "selObjectPropertyName": "user_name"
                    },
                    {
                      "argumentName": "roleName",
                      "selObjectPropertyName": "role_name"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_ROLE_TO_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "person_add",
                    "title": {
                      "label_en": "Assign Role to User",
                      "label_es": "Asignar Perfil a Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "multilist1": {
                          "label_en": "User",
                          "label_es": "Usuario",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_users",
                            "propertyKeyName": "user_name",
                            "propertyKeyValueEn": [
                              "user_name"
                            ],
                            "propertyKeyValueEs": [
                              "user_name"
                            ]
                          }
                        }
                      },
                      {
                        "multilist2": {
                          "label_en": "Role",
                          "label_es": "Rol",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_roles",
                            "propertyKeyName": "role_name",
                            "propertyKeyValueEn": [
                              "role_name"
                            ],
                            "propertyKeyValueEs": [
                              "role_name"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "element": "mulitlist1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "roleName",
                      "element": "multilist2",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "1.4) Users by Roles",
                "label_es": "1.4) Usuarios por Perfil"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "access_users_per_roles"
            },
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "1.5) Actions by Roles",
                "label_es": "1.5) Acciones por Perfil"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "access_roles_actions"
            },
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "1.6) SOPs by Roles",
                "label_es": "1.6) PNTs por Perfil"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "access_roles_sops"
            }
          ]
        }
      },
      {
        "name": "SOP",
        "tabLabel_en": "2) SOPs",
        "tabLabel_es": "2) PNTs",
        "xtitle": {
          "label_en": "2) SOPs",
          "label_es": "2) PNTs"
        },
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "endPointResponseObject": "sops",
              "theme": "TRAZiT-DefinitionArea",
              "num_columns": 1,
              "add_border": true,
              "columns": [
                {
                  "name": "sop_name",
                  "label_en": "Name",
                  "label_es": "Nombre",
                  "fix_value2_prefix": " v",
                  "name2": "sop_version"
                },
                {
                  "name": "expires",
                  "label_en": "Expires?",
                  "label_es": "¿Caduca?"
                },
                {
                  "name": "current_status",
                  "label_en": "Current Status",
                  "label_es": "Estado Actual"
                },
                {
                  "name": "brief_summary",
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                },
                {
                  "name": "file_link",
                  "label_en": "File link",
                  "label_es": "Link al fichero"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "REMOVE_SOP",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove SOP",
                      "label_es": "Borrar PNT"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "sopName",
                      "selObjectPropertyName": "sop_name"
                    }
                  ]
                },
                {
                  "actionName": "RENAME_SOP",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "settings",
                    "title": {
                      "label_en": "Rename SOP",
                      "label_es": "Renombrar PNT"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New SOP Name",
                          "label_es": "Nombre nuevo del PNT",
                          "selObjectPropertyName": "sop_name"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "sopName",
                      "selObjectPropertyName": "sop_name"
                    },
                    {
                      "argumentName": "newsopName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_SOP",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add SOP",
                      "label_es": "Add PNT"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "SOP Name",
                          "label_es": "Nombre PNT"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Link",
                          "label_es": "Vínculo"
                        }
                      },
                      {
                        "text3": {
                          "label_en": "Summary",
                          "label_es": "Resumen"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "sopVersion",
                      "fixValue": "1"
                    },
                    {
                      "argumentName": "fileLink",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "brief_summary",
                      "element": "text3",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true,
                      "notAddWhenValueIsBlank": true,
                      "isAdhocField": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "name": "USER REQUIREMENTS",
        "tabLabel_en": "3) USER REQUIREMENTS",
        "tabLabel_es": "3) REQUERIMIENTOS DE USUARIO",
        "xtitle": {
          "label_en": "3) USER REQUIREMENTS",
          "label_es": "3) REQUERIMIENTOS DE USUARIO"
        },
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "parentReadOnlyTable",
              "endPointResponseObject": "procedure_user_requirements_tree",
              "theme": "TRAZiT-DefinitionArea",
              "columns": [
                {
                  "name": "parent_code",
                  "label_en": "Code",
                  "label_es": "Código",
                  "fix_value2_prefix": " - ",
                  "name2": "code",
                  "fix_value3_prefix": " (",
                  "name3": "req_id",
                  "fix_value3_suffix": ")"
                },
                {
                  "name": "description",
                  "label_en": "Description ",
                  "label_es": "Descripción "
                },
                {
                  "name": "active",
                  "label_en": "Active?",
                  "label_es": "¿Activo? "
                },
                {
                  "name": "in_system",
                  "label_en": "In System?",
                  "label_es": "¿En el sistema?"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "UPDATE_INFO_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Update Parent User Requirement",
                      "label_es": "Actualizar Requerimiento Padre"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "parent_code"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "UPDATE_INFO_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Update User Requirement",
                      "label_es": "Actualizar Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "req_parent_code"
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "req_code"
                    },
                    {
                      "argumentName": "order_number",
                      "selObjectPropertyName": "order_number"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "MOVE_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Move Requirement ",
                      "label_es": "Mover Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Parent code",
                          "label_es": "Código paterno"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Code",
                          "label_es": "Código"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "req_parent_code"
                    },
                    {
                      "argumentName": "newrequirementParentCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "req_code"
                    },
                    {
                      "argumentName": "newrequirementCode",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "orderNumber",
                      "selObjectPropertyName": "order_number"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Requirement",
                      "label_es": "Borrar Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "code"
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "parent_code"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Parent Requirement",
                      "label_es": "Borrar Requisito Padre"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "parent_code"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "NEW_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add Parent User Requirement",
                      "label_es": "Añadir Requerimiento Padre de Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Parent Code",
                          "label_es": "Código paterno"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Description",
                          "label_es": "Descripción"
                        }
                      },
                      {
                        "number1": {
                          "label_en": "Order",
                          "label_es": "Orden",
                          "default_value": 1
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox2": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox3": {
                          "label_en": "In system?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "description",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "order_number",
                      "element": "number1"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "NEW_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add User Requirement",
                      "label_es": "Añadir Requerimiento de Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "list1": {
                          "label_en": "Parent Requirement",
                          "label_es": "Requerimiento Padre",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "parent_code",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "text1": {
                          "label_en": "Code",
                          "label_es": "Código"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Description",
                          "label_es": "Descripción"
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox2": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox3": {
                          "label_en": "In system?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "element": "list1"
                    },
                    {
                      "argumentName": "requirementCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "description",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "order_number",
                      "selObjectPropertyName": "order_number"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                }
              ],
              "children": "children",
              "children_definition": {
                "columns": [
                  {
                    "name": "code",
                    "label_en": "Code",
                    "label_es": "Código",
                    "fix_value2_prefix": " - ",
                    "name2": "code",
                    "fix_value3_prefix": " (",
                    "name3": "req_id",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "name": "description",
                    "label_en": "Description ",
                    "label_es": "Descripción "
                  },
                  {
                    "name": "active",
                    "label_en": "Active?",
                    "label_es": "¿Activo? "
                  },
                  {
                    "name": "in_system",
                    "label_en": "In System?",
                    "label_es": "¿En el sistema?"
                  }
                ],
                "row_buttons": [
                  {
                    "actionName": "UPDATE_INFO_PARENT_USER_REQUIREMENT",
                    "notGetViewData": true,
                    "clientMethod": "procMngRequirementsMethod",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "manage_accounts",
                      "title": {
                        "label_en": "Update Parent User Requirement",
                        "label_es": "Actualizar Requerimiento Padre"
                      },
                      "showWhenSelectedItem": {
                        "column": "code",
                        "value": "*NULL*"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "genericDialog",
                      "fields": [
                        {
                          "checkbox1": {
                            "label_en": "Active?",
                            "label_es": "¿Activo?",
                            "default_value": true
                          },
                          "checkbox2": {
                            "label_en": "In System?",
                            "label_es": "¿En sistema?",
                            "default_value": true
                          },
                          "checkbox3": {
                            "label_en": "In scope?",
                            "label_es": "¿En alcance?",
                            "default_value": true
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "requirementParentCode",
                        "selObjectPropertyName": "parent_code"
                      },
                      {
                        "argumentName": "active",
                        "element": "checkbox1"
                      },
                      {
                        "argumentName": "in_system",
                        "element": "checkbox2"
                      },
                      {
                        "argumentName": "in_scope",
                        "element": "checkbox3"
                      }
                    ]
                  },
                  {
                    "actionName": "UPDATE_INFO_USER_REQUIREMENT",
                    "notGetViewData": true,
                    "clientMethod": "procMngRequirementsMethod",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "manage_accounts",
                      "title": {
                        "label_en": "Update User Requirement",
                        "label_es": "Actualizar Requerimiento"
                      },
                      "showWhenSelectedItem": {
                        "column": "code",
                        "value": "*NOT_NULL*"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "genericDialog",
                      "fields": [
                        {
                          "checkbox1": {
                            "label_en": "Active?",
                            "label_es": "¿Activo?",
                            "default_value": true
                          },
                          "checkbox2": {
                            "label_en": "In System?",
                            "label_es": "¿En sistema?",
                            "default_value": true
                          },
                          "checkbox3": {
                            "label_en": "In scope?",
                            "label_es": "¿En alcance?",
                            "default_value": true
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "requirementParentCode",
                        "selObjectPropertyName": "req_parent_code"
                      },
                      {
                        "argumentName": "requirementCode",
                        "selObjectPropertyName": "req_code"
                      },
                      {
                        "argumentName": "order_number",
                        "selObjectPropertyName": "order_number"
                      },
                      {
                        "argumentName": "active",
                        "element": "checkbox1"
                      },
                      {
                        "argumentName": "in_scope",
                        "element": "checkbox2"
                      },
                      {
                        "argumentName": "in_system",
                        "element": "checkbox3"
                      }
                    ]
                  },
                  {
                    "actionName": "MOVE_USER_REQUIREMENT",
                    "notGetViewData": true,
                    "clientMethod": "procMngRequirementsMethod",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "update",
                      "title": {
                        "label_en": "Move Requirement ",
                        "label_es": "Mover Requerimiento"
                      },
                      "showWhenSelectedItem": {
                        "column": "code",
                        "value": "*NOT_NULL*"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "genericDialog",
                      "fields": [
                        {
                          "text1": {
                            "label_en": "Parent code",
                            "label_es": "Código paterno"
                          }
                        },
                        {
                          "text2": {
                            "label_en": "Code",
                            "label_es": "Código"
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "requirementParentCode",
                        "selObjectPropertyName": "req_parent_code"
                      },
                      {
                        "argumentName": "newrequirementParentCode",
                        "element": "text1",
                        "defaultValue": ""
                      },
                      {
                        "argumentName": "requirementCode",
                        "selObjectPropertyName": "req_code"
                      },
                      {
                        "argumentName": "newrequirementCode",
                        "element": "text2",
                        "defaultValue": ""
                      },
                      {
                        "argumentName": "orderNumber",
                        "selObjectPropertyName": "order_number"
                      }
                    ]
                  },
                  {
                    "actionName": "REMOVE_USER_REQUIREMENT",
                    "notGetViewData": true,
                    "clientMethod": "procMngRequirementsMethod",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "delete_forever",
                      "title": {
                        "label_en": "Remove Requirement",
                        "label_es": "Borrar Requerimiento"
                      },
                      "showWhenSelectedItem": {
                        "column": "code",
                        "value": "*NOT_NULL*"
                      },
                      "requiresGridItemSelected": false
                    },
                    "endPointParams": [
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "requirementParentCode",
                        "selObjectPropertyName": "code"
                      },
                      {
                        "argumentName": "requirementCode",
                        "selObjectPropertyName": "parent_code"
                      }
                    ]
                  },
                  {
                    "actionName": "REMOVE_PARENT_USER_REQUIREMENT",
                    "notGetViewData": true,
                    "clientMethod": "procMngRequirementsMethod",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "delete_forever",
                      "title": {
                        "label_en": "Remove Parent Requirement",
                        "label_es": "Borrar Requisito Padre"
                      },
                      "showWhenSelectedItem": {
                        "column": "code",
                        "value": "*NULL*"
                      },
                      "requiresGridItemSelected": false
                    },
                    "endPointParams": [
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "requirementParentCode",
                        "selObjectPropertyName": "parent_code"
                      }
                    ]
                  }
                ]
              }
            },
            {
              "type": "zzztree",
              "view_definition": [
                {
                  "key": "req_id",
                  "label": "parent_code",
                  "label2": [
                    "'('",
                    "req_id",
                    "') '",
                    "parent_code"
                  ],
                  "children": "children"
                },
                {
                  "key": "req_id",
                  "label": "code",
                  "label2": [
                    "'('",
                    "req_id",
                    "') '",
                    "code"
                  ]
                }
              ],
              "endPointResponseObject": "procedure_user_requirements_tree",
              "columns": [
                {
                  "name": "parent_code",
                  "label_en": "Code",
                  "label_es": "Código",
                  "fix_value2_prefix": " - ",
                  "name2": "code",
                  "fix_value3_prefix": " (",
                  "name3": "req_id",
                  "fix_value3_suffix": ")"
                },
                {
                  "name": "description",
                  "label_en": "Description ",
                  "label_es": "Descripción "
                },
                {
                  "name": "active",
                  "label_en": "Active?",
                  "label_es": "¿Activo? "
                },
                {
                  "name": "in_system",
                  "label_en": "In System?",
                  "label_es": "¿En el sistema?"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "UPDATE_INFO_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Update Parent User Requirement",
                      "label_es": "Actualizar Requerimiento Padre"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "parent_code"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "UPDATE_INFO_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "manage_accounts",
                    "title": {
                      "label_en": "Update User Requirement",
                      "label_es": "Actualizar Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "req_parent_code"
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "req_code"
                    },
                    {
                      "argumentName": "order_number",
                      "selObjectPropertyName": "order_number"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "MOVE_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Move Requirement ",
                      "label_es": "Mover Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Parent code",
                          "label_es": "Código paterno"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Code",
                          "label_es": "Código"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "req_parent_code"
                    },
                    {
                      "argumentName": "newrequirementParentCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "req_code"
                    },
                    {
                      "argumentName": "newrequirementCode",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "orderNumber",
                      "selObjectPropertyName": "order_number"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Requirement",
                      "label_es": "Borrar Requerimiento"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NOT_NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "code"
                    },
                    {
                      "argumentName": "requirementCode",
                      "selObjectPropertyName": "parent_code"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Parent Requirement",
                      "label_es": "Borrar Requisito Padre"
                    },
                    "showWhenSelectedItem": {
                      "column": "code",
                      "value": "*NULL*"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "selObjectPropertyName": "parent_code"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "NEW_PARENT_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add Parent User Requirement",
                      "label_es": "Añadir Requerimiento Padre de Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Parent Code",
                          "label_es": "Código paterno"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Description",
                          "label_es": "Descripción"
                        }
                      },
                      {
                        "number1": {
                          "label_en": "Order",
                          "label_es": "Orden",
                          "default_value": 1
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox2": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox3": {
                          "label_en": "In system?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "description",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "order_number",
                      "element": "number1"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                },
                {
                  "actionName": "NEW_USER_REQUIREMENT",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add User Requirement",
                      "label_es": "Añadir Requerimiento de Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "list1": {
                          "label_en": "Parent Requirement",
                          "label_es": "Requerimiento Padre",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "parent_code",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "text1": {
                          "label_en": "Code",
                          "label_es": "Código"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Description",
                          "label_es": "Descripción"
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox2": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        }
                      },
                      {
                        "checkbox3": {
                          "label_en": "In system?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementParentCode",
                      "element": "list1"
                    },
                    {
                      "argumentName": "requirementCode",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "description",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "order_number",
                      "selObjectPropertyName": "order_number"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox3"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "name": "REQ SOLUTION",
        "tabLabel_en": "4) REQUIREMENT SOLUTIONS",
        "tabLabel_es": "4) SOLUCIONES DE REQUERIMIENTOS",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "parentReadOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "procedure_req_solution_tree",
              "columns": [
                {
                  "name": "type",
                  "label_en": "Type",
                  "label_es": "Tipo"
                },
                {
                  "name": "relevant_info_1",
                  "label_en": "1.)Relevant Info",
                  "label_es": "1.)Información relevante"
                },
                {
                  "name": "relevant_info_2",
                  "label_en": "2.)Relevant Info",
                  "label_es": "2.)Información relevante"
                },
                {
                  "name": "sop_name",
                  "label_en": "SOP",
                  "label_es": "PNT"
                },
                {
                  "name": "roles",
                  "label_en": "SOP",
                  "label_es": "PNT",
                  "is_tag_list": true
                },                
                {
                  "name": "active",
                  "label_en": "Active?",
                  "label_es": "¿Activo?"
                },
                {
                  "name": "in_system",
                  "label_en": "In System?",
                  "label_es": "¿En el sistema?"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "UPDATE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Update Requirement Solution",
                      "label_es": "Actualizar Solución de Requerimiento"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        },
                        "list1": {
                          "label_en": "SOP",
                          "label_es": "PNT",
                          "selObjectPropertyName": "sop_name",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "sops",
                            "propertyKeyName": "sop_name",
                            "propertyKeyValueEn": [
                              "sop_name"
                            ],
                            "propertyKeyValueEs": [
                              "sop_name"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox3"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "list1"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Requirement Solution",
                      "label_es": "Borrar Solución de Requisito"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_WINDOW_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "note_add",
                    "title": {
                      "label_en": "Add Window Solution",
                      "label_es": "Añadir Solución de Ventana"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Window Name",
                          "label_es": "Nombre para la ventana"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Label EN",
                          "label_es": "Etiqueta EN"
                        }
                      },
                      {
                        "text3": {
                          "label_en": "Label ES",
                          "label_es": "Etiqueta ES"
                        }
                      },
                      {
                        "text4": {
                          "label_en": "Order number",
                          "label_es": "Número orden"
                        }
                      },
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "width": "800px",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "list2": {
                          "label_en": "Query",
                          "label_es": "Consulta",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromMasterData": {
                            "propertyNameContainer": "modules",
                            "filterInFirstLevel": true,
                            "filterPropertyName": "module_name",
                            "contextVariableName": "moduleName",
                            "propertyNameContainerLevel2": "module_in_solution_queries",
                            "propertyKeyName": "endpoint_name",
                            "propertyKeyValueEn": "endpoint_name",
                            "propertyKeyValueEs": "endpoint_name"
                          }
                        }
                      },
                      {
                        "list3": {
                          "items": [
                            {
                              "keyName": "simple",
                              "keyValue_en": "Simple",
                              "keyValue_es": "Simple"
                            },
                            {
                              "keyName": "twoicons",
                              "keyValue_en": "Two icons",
                              "keyValue_es": "Dos iconos"
                            }
                          ],
                          "label_en": "Type",
                          "label_es": "Tipo",
                          "optional": false,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "list4": {
                          "items": [
                            {
                              "keyName": "edit",
                              "keyValue_en": "Edit",
                              "keyValue_es": "Editar"
                            },
                            {
                              "keyName": "readonly",
                              "keyValue_en": "Read only",
                              "keyValue_es": "Sólo lectura"
                            }
                          ],
                          "label_en": "Mode",
                          "label_es": "Modo",
                          "optional": false,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "multilist5": {
                          "label_en": "Role",
                          "label_es": "Rol",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_roles",
                            "propertyKeyName": "role_name",
                            "propertyKeyValueEn": [
                              "role_name"
                            ],
                            "propertyKeyValueEs": [
                              "role_name"
                            ]
                          }
                        }
                      },
                      {
                        "list6": {
                          "items": [
                            {
                              "keyName": "TABLE_WITH_BUTTONS",
                              "keyValue_en": "Table with buttons",
                              "keyValue_es": "Tabla con botones"
                            },
                            {
                              "keyName": "TABS",
                              "keyValue_en": "Tabs",
                              "keyValue_es": "Pestañas"
                            }
                          ],
                          "label_en": "Content type",
                          "label_es": "Tipo de pantalla",
                          "optional": false,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "list7": {
                          "label_en": "SOP",
                          "label_es": "PNT",
                          "optional": true,
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "sops",
                            "propertyKeyName": "sop_name",
                            "propertyKeyValueEn": [
                              "sop_name"
                            ],
                            "propertyKeyValueEs": [
                              "sop_name"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1"
                    },
                    {
                      "argumentName": "windowName",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "orderNumber",
                      "element": "text4"
                    },
                    {
                      "argumentName": "windowQuery",
                      "element": "list2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "windowType",
                      "element": "list3"
                    },
                    {
                      "argumentName": "windowMode",
                      "element": "list4"
                    },
                    {
                      "argumentName": "roleName",
                      "element": "multilist5"
                    },
                    {
                      "argumentName": "label_en",
                      "element": "text2",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    },
                    {
                      "argumentName": "label_es",
                      "element": "text3",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    },
                    {
                      "argumentName": "contentType",
                      "element": "list6"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "list7"
                    }
                  ]
                },
                {
                  "actionName": "ADD_WINDOW_BUTTON_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add Window Action Solution",
                      "label_es": "Añadir Solución de tipo acción"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "list2": {
                          "label_en": "Action",
                          "label_es": "Acción",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromMasterData": {
                            "propertyNameContainer": "modules",
                            "filterInFirstLevel": true,
                            "filterPropertyName": "module_name",
                            "contextVariableName": "moduleName",
                            "propertyNameContainerLevel2": "module_in_solution_actions",
                            "propertyKeyName": "endpoint_name",
                            "propertyKeyValueEn": "endpoint_name",
                            "propertyKeyValueEs": "endpoint_name"
                          }
                        }
                      },
                      {
                        "list3": {
                          "label_en": "Role",
                          "label_es": "Rol",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_roles",
                            "propertyKeyName": "role_name",
                            "propertyKeyValueEn": [
                              "role_name"
                            ],
                            "propertyKeyValueEs": [
                              "role_name"
                            ]
                          }
                        }
                      },
                      {
                        "list5": {
                          "items": [
                            {
                              "keyName": "Window Button",
                              "keyValue_en": "View Actions",
                              "keyValue_es": "Acciones de ventana"
                            },
                            {
                              "keyName": "Table Row Button",
                              "keyValue_en": "Table row button",
                              "keyValue_es": "Acción de tabla"
                            }
                          ],
                          "label_en": "Action Type",
                          "label_es": "Tipo de acción",
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Order number",
                          "label_es": "Número orden"
                        }
                      },
                      {
                        "list4": {
                          "items": [
                            {
                              "keyName": "justif",
                              "keyValue_en": "Justification reason",
                              "keyValue_es": "Justificar el cambio"
                            },
                            {
                              "keyName": "confirm",
                              "keyValue_en": "Confirm to proceed",
                              "keyValue_es": "Confirmar para continuar"
                            },
                            {
                              "keyName": "user",
                              "keyValue_en": "Confirm user credentials",
                              "keyValue_es": "Confirmar credenciales usuario"
                            },
                            {
                              "keyName": "esign",
                              "keyValue_en": "Confirm eSignature",
                              "keyValue_es": "Confirmar firma electrónica"
                            }
                          ],
                          "label_en": "Confirm Dialog",
                          "label_es": "Diálogo de confirmación",
                          "optional": true,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "text1": {
                          "label_en": "Dialog Detail",
                          "label_es": "Detalle del diálogo",
                          "default_value": "TEXT or LIST or TEXTLIST (for (text)lists specify entries separated by |)",
                          "optional": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "windowActionName",
                      "element": "list2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "roleName",
                      "element": "list3",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "confirmDialog",
                      "element": "list4",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "actionType",
                      "element": "list5",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "confirmDialogDetail",
                      "element": "text1"
                    },
                    {
                      "argumentName": "orderNumber",
                      "element": "text2"
                    },
                    {
                      "argumentName": "type",
                      "defaultValue": "Window Action"
                    }
                  ]
                },
                {
                  "actionName": "ADD_BUSINESS_RULE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "library_add",
                    "title": {
                      "label_en": "Add Business Rule Solution",
                      "label_es": "Añadir Solución de regla de negocio"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "list2": {
                          "label_en": "Action",
                          "label_es": "Acción",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromMasterData": {
                            "propertyNameContainer": "modules",
                            "filterInFirstLevel": true,
                            "filterPropertyName": "module_name",
                            "contextVariableName": "moduleName",
                            "propertyNameContainerLevel2": "module_in_solution_business_rules",
                            "propertyKeyName": "rule_name",
                            "propertyKeyValueEn": "rule_name",
                            "propertyKeyValueEs": "rule_name"
                          }
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Bussiness Rule Value",
                          "label_es": "Valor Regla de Negocio"
                        }
                      },
                      {
                        "text3": {
                          "label_en": "Order Number",
                          "label_es": "Número orden"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1"
                    },
                    {
                      "argumentName": "businessRuleArea",
                      "fixValue": "procedure"
                    },
                    {
                      "argumentName": "businessRuleName",
                      "element": "list2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "businessRuleValue",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "orderNumber",
                      "element": "text3",
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "actionName": "ADD_SPECIAL_WINDOW_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add_to_queue",
                    "title": {
                      "label_en": "Add Predefined View Solution",
                      "label_es": "Añadir Vista predefinida de Ventana"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text2": {
                          "label_en": "Label EN",
                          "label_es": "Etiqueta EN"
                        }
                      },
                      {
                        "text3": {
                          "label_en": "Label ES",
                          "label_es": "Etiqueta ES"
                        }
                      },
                      {
                        "text4": {
                          "label_en": "Order Number",
                          "label_es": "Número orden"
                        }
                      },
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "list2": {
                          "label_en": "View",
                          "label_es": "Ventana",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromMasterData": {
                            "propertyNameContainer": "modules",
                            "filterInFirstLevel": true,
                            "filterPropertyName": "module_name",
                            "contextVariableName": "moduleName",
                            "propertyNameContainerLevel2": "module_in_solution_special_views",
                            "propertyKeyName": "view_name",
                            "propertyKeyValueEn": "view_name",
                            "propertyKeyValueEs": "view_name"
                          }
                        }
                      },
                      {
                        "list4": {
                          "items": [
                            {
                              "keyName": "edit",
                              "keyValue_en": "Edit",
                              "keyValue_es": "Editar"
                            },
                            {
                              "keyName": "readonly",
                              "keyValue_en": "Read only",
                              "keyValue_es": "Sólo lectura"
                            }
                          ],
                          "label_en": "Mode",
                          "label_es": "Modo",
                          "optional": false,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "list5": {
                          "label_en": "Role",
                          "label_es": "Rol",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_roles",
                            "propertyKeyName": "role_name",
                            "propertyKeyValueEn": [
                              "role_name"
                            ],
                            "propertyKeyValueEs": [
                              "role_name"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1"
                    },
                    {
                      "argumentName": "orderNumber",
                      "element": "text4"
                    },
                    {
                      "argumentName": "specialWindowName",
                      "element": "list2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "windowMode",
                      "element": "list4"
                    },
                    {
                      "argumentName": "roleName",
                      "element": "list5"
                    },
                    {
                      "argumentName": "label_en",
                      "element": "text2",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    },
                    {
                      "argumentName": "label_es",
                      "element": "text3",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    }
                  ]
                }
              ],
              "children": "children",
              "children_definition": {
                "columns": [
                {
                  "name": "type",
                  "label_en": "Type",
                  "label_es": "Tipo"
                },
                {
                  "name": "relevant_info_1",
                  "label_en": "1.)Relevant Info",
                  "label_es": "1.)Información relevante"
                },
                {
                  "name": "relevant_info_2",
                  "label_en": "2.)Relevant Info",
                  "label_es": "2.)Información relevante"
                },
                {
                  "name": "sop_name",
                  "label_en": "SOP",
                  "label_es": "PNT"
                },
                {
                  "name": "active",
                  "label_en": "Active?",
                  "label_es": "¿Activo?"
                },
                {
                  "name": "in_system",
                  "label_en": "In System?",
                  "label_es": "¿En el sistema?"
                }
              ],
                "row_buttons": [
                {
                  "actionName": "UPDATE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Update Requirement Solution",
                      "label_es": "Actualizar Solución de Requerimiento"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        },
                        "checkbox2": {
                          "label_en": "In System?",
                          "label_es": "¿En sistema?",
                          "default_value": true
                        },
                        "checkbox3": {
                          "label_en": "In scope?",
                          "label_es": "¿En alcance?",
                          "default_value": true
                        },
                        "list1": {
                          "label_en": "SOP",
                          "label_es": "PNT",
                          "selObjectPropertyName": "sop_name",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "sops",
                            "propertyKeyName": "sop_name",
                            "propertyKeyValueEn": [
                              "sop_name"
                            ],
                            "propertyKeyValueEs": [
                              "sop_name"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "in_system",
                      "element": "checkbox2"
                    },
                    {
                      "argumentName": "in_scope",
                      "element": "checkbox3"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "list1"
                    }
                  ]
                },
                {
                  "actionName": "REMOVE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove Requirement Solution",
                      "label_es": "Borrar Solución de Requisito"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    }
                  ]
                }
              ]
              }
            }
          ]
        }
      },
      {
        "name": "RISK ASSESSMENT",
        "tabLabel_en": "5) RISK ASSESSMENT",
        "tabLabel_es": "5) EVALUACIÓN DE RIESGOS",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "endPointResponseObject": "procedure_risk_assessment",
              "theme": "TRAZiT-DefinitionArea",
              "columns": [
                {
                  "name": "risk_id",
                  "label_en": "RISK ID?",
                  "label_es": "ID DEL RIESGO"
                },
                {
                  "name": "level",
                  "label_en": "Risk level",
                  "label_es": "Nivel de riesgo"
                },
                {
                  "name": "has_to_be_part_of_testing",
                  "label_en": "Part of testing?",
                  "label_es": "¿Parte del testeo?"
                },
                {
                  "name": "expected_tests",
                  "label_en": "Expected Tests",
                  "label_es": "Tests esperados"
                },
                {
                  "name": "comments",
                  "label_en": "Comments",
                  "label_es": "Comentarios"
                },
                {
                  "name": "ready_for_revision",
                  "label_en": "Ready for revision",
                  "label_es": "Listo para revisión"
                },
                {
                  "name": "signed",
                  "label_en": "Signed",
                  "label_es": "Firmado"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "REMOVE_RISK",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "procedure_risk_assessment",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "remove",
                    "title": {
                      "label_en": "Remove Risk",
                      "label_es": "Borrar riesgo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "riskId",
                      "selObjectPropertyName": "risk_id"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    }
                  ]
                },
                {
                  "actionName": "UPDATE_RISK",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Update Risk",
                      "label_es": "Actualizar riesgo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Level of risk",
                          "label_es": "Nivel de riesgo"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Comments",
                          "label_es": "Comentario"
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Part of testing?",
                          "label_es": "¿Parte del testeo?"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "riskId",
                      "selObjectPropertyName": "risk_id"
                    },
                    {
                      "argumentName": "fieldName",
                      "value": "level"
                    },
                    {
                      "argumentName": "fieldValue",
                      "targetValue": true
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    }
                  ]
                },
                {
                  "actionName": "SET_RISK_READY_FOR_REVISION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "settings_timelapse",
                    "title": {
                      "label_en": "Set ready for revision",
                      "label_es": "Marcar listo para revisión"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "riskId",
                      "selObjectPropertyName": "risk_id"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    }
                  ]
                },
                {
                  "actionName": "SIGN_RISK",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "draw",
                    "title": {
                      "label_en": "Sign Risk",
                      "label_es": "Firmar riesgo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "riskId",
                      "selObjectPropertyName": "risk_id"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "actionName": "NEW_RISK",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "New Risk",
                      "label_es": "Nuevo Riesgo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "list2": {
                          "items": [
                            {
                              "keyName": "HIGH",
                              "keyValue_en": "HIGH",
                              "keyValue_es": "ALTO"
                            },
                            {
                              "keyName": "MEDIUM",
                              "keyValue_en": "MEDIUM",
                              "keyValue_es": "MEDIO"
                            }
                          ],
                          "label_en": "Risk Level",
                          "label_es": "Nivel de Riesgo",
                          "optional": false,
                          "addBlankValueOnTop": true
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Comments",
                          "label_es": "Comentarios",
                          "defaultValue": true
                        }
                      },
                      {
                        "text3": {
                          "label_en": "Expected Test",
                          "label_es": "Test esperado"
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Part of Testing?",
                          "label_es": "¿Parte del testeo?",
                          "default_value": true
                        }
                      },
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "code",
                              "description"
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1"
                    },
                    {
                      "argumentName": "level",
                      "element": "list2"
                    },
                    {
                      "argumentName": "comments",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "partOfTesting",
                      "element": "checkbox1"
                    },
                    {
                      "argumentName": "expectedTestNames",
                      "element": "text3",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "name": "MODULE BUSSINESS RULES",
        "tabLabel_en": "6) MODULE BUSINESS RULES",
        "tabLabel_es": "6) REGLAS DE NEGOCIO DEL MODULO",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "module_in_solution_business_rules",
              "columns": [
                {
                  "name": "rule_name",
                  "label_en": "Rule name",
                  "label_es": "Nombre regla"
                },
                {
                  "name": "api_name",
                  "label_en": "API name",
                  "label_es": "Nombre API"
                },
                {
                  "name": "category",
                  "label_en": "Category",
                  "label_es": "Categoría"
                },
                {
                  "name": "is_mandatory",
                  "label_en": "Mandatory?",
                  "label_es": "¿Obligatorio?",
                  "is_icon": true
                },
                {
                  "name": "requirements_list",
                  "label_en": "Requirements List",
                  "label_es": "Lista de Requerimientos"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "ADD_BUSINESS_RULE_REQ_SOLUTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add as solution",
                      "label_es": "Añadir como solución"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Rule Name",
                          "label_es": "Nombre de la regla",
                          "selObjectPropertyName": "rule_name",
                          "disabled": true
                        }
                      },
                      {
                        "list1": {
                          "label_en": "Requirement",
                          "label_es": "Requerimiento",
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": false,
                          "valuesFromSelectedItem": {
                            "internalVariableSingleObjName": "selectedItem",
                            "internalVariableSingleObjProperty": "procedure_user_requirements",
                            "propertyKeyName": "req_id",
                            "propertyKeyValueEn": [
                              "parent_code",
                              "code",
                              "description"
                            ],
                            "propertyKeyValueEs": [
                              "parent_code",
                              "code",
                              "description"
                            ]
                          }
                        }
                      },
                      {
                        "text2": {
                          "label_en": "Bussiness Rule Value",
                          "label_es": "Valor Regla de Negocio"
                        }
                      },
                      {
                        "dynamicElement1": {
                          "label_en": "Value",
                          "label_es": "Valor",
                          "rule": {
                            "field": "values_list",
                            "logic": [
                              {
                                "value": "*NULL*",
                                "element": "text"
                              },
                              {
                                "value": "*NOT_NULL*",
                                "element": "list"
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "element": "list1"
                    },
                    {
                      "argumentName": "businessRuleArea",
                      "fixValue": "procedure"
                    },
                    {
                      "argumentName": "businessRuleName",
                      "selObjectPropertyName": "rule_name"
                    },
                    {
                      "argumentName": "businessRuleValue",
                      "element": "text2",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "name": "MODULE ACTIONS",
        "tabLabel_en": "7) MODULE ACTIONS",
        "tabLabel_es": "7) ACCIONES DEL MODULO",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "module_in_solution_actions",
              "columns": [
                {
                  "name": "entity",
                  "label_en": "Entity",
                  "label_es": "Entidad"
                },
                {
                  "name": "endpoint_name",
                  "label_en": "Endpoint name",
                  "label_es": "Nombre endpoint"
                },
                {
                  "name": "requirements_list",
                  "label_en": "Requirements List",
                  "label_es": "Lista de Requerimientos"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "MODULE QUERIES",
        "tabLabel_en": "8) MODULE QUERIES",
        "tabLabel_es": "8) CONSULTAS DEL MODULO",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "module_in_solution_queries",
              "columns": [
                {
                  "name": "entity",
                  "label_en": "Entity",
                  "label_es": "Entidad"
                },
                {
                  "name": "endpoint_name",
                  "label_en": "Endpoint name",
                  "label_es": "Nombre endpoint"
                },
                {
                  "name": "requirements_list",
                  "label_en": "Requirements List",
                  "label_es": "Lista de Requerimientos"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "MODULE SPECIAL VIEWS",
        "tabLabel_en": "9) MODULE SPECIAL VIEWS",
        "tabLabel_es": "9) VISTAS ESPECIALES DEL MODULO",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "module_in_solution_special_views",
              "columns": [
                {
                  "name": "view_name",
                  "label_en": "View name",
                  "label_es": "Nombre"
                },
                {
                  "name": "entity",
                  "label_en": "Entity",
                  "label_es": "Entidad"
                },
                {
                  "name": "requirements_list",
                  "label_en": "Requirements List",
                  "label_es": "Lista de Requerimientos"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "MODULE TABLES",
        "tabLabel_en": "10) MODULE TABLES",
        "tabLabel_es": "10) MODULE TABLES",
        "expanded": false,
        "view_definition": {
          "elements": [
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointResponseObject": "procedure_tables",
              "columns": [
                {
                  "name": "schema_name",
                  "label_en": "Repository",
                  "label_es": "Repositorio"
                },
                {
                  "name": "name",
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "is_view",
                  "label_en": "Is view?",
                  "label_es": "¿Vista?",
                  "is_icon": true
                },
                {
                  "name": "is_mandatory",
                  "label_en": "Is mandatory?",
                  "label_es": "¿Obligatorio?",
                  "is_icon": true
                }
              ],
              "xxrow_buttons": [
                {
                  "actionName": "REMOVE_SOP",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "delete_forever",
                    "title": {
                      "label_en": "Remove SOP",
                      "label_es": "Borrar PNT"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "SOP Name",
                          "label_es": "Nombre PNT"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ],
              "xxactions": [
                {
                  "actionName": "ADD_SOP",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Add SOP",
                      "label_es": "Add PNT"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "SOP Name",
                          "label_es": "Nombre PNT"
                        },
                        "text2": {
                          "label_en": "Summary",
                          "label_es": "Resumen"
                        },
                        "text3": {
                          "label_en": "Link",
                          "label_es": "Vínculo"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "sopName",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "sopVersion",
                      "fixValue": "1"
                    },
                    {
                      "argumentName": "fileLink",
                      "element": "text2",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "brief_summary",
                      "element": "text3",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true,
                      "notAddWhenValueIsBlank": true,
                      "isAdhocField": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    "name": "VIEWS_DESIGNER",
    "title": {
      "label_en": "Views designer",
      "label_es": "Diseño de Pantallas"
    },
    "expanded": false,
    "alternative_endpoint_data": "views_design",
    "view_definition": {
      "hasDetail": true,
      "detail": {
        "name": "VIEWS_DESIGNER",
        "paneName": "genericList",
        "clickItemAction": "viewDesignerAction",
        "type": "objectsList",
        "endPointPropertyArray": [
          "views_design"
        ],
        "keyFieldItem": "solution_id",
        "fieldsToDisplayInFilter": [
          {
            "name": "window_name",
            "label_en": "Name",
            "label_es": "Nombre"
          },
          {
            "name": "window_name",
            "label_en": "Summary",
            "label_es": "Resumen"
          }
        ],
        "view_definition": []
      },
      "reportElements": [
        {
          "type": "reportTitle",
          "title": {
            "label_en": "Main Information",
            "label_es": "Información principal"
          },
          "elements": [
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "ROOT"
              ],
              "num_columns": 2,
              "fieldsToDisplay": [
                {
                  "name": "content_type",
                  "label_en": "content_type",
                  "label_es": "content_type"
                },
                {
                  "name": "window_type",
                  "label_en": "window_type",
                  "label_es": "window_type"
                },
                {
                  "name": "window_name",
                  "label_en": "window_name",
                  "label_es": "window_name"
                },
                {
                  "name": "window_query",
                  "label_en": "window_query",
                  "label_es": "window_query"
                },
                {
                  "name": "window_mode",
                  "label_en": "window_mode",
                  "label_es": "window_mode"
                },
                {
                  "name": "window_label_en",
                  "label_en": "window_label_en",
                  "label_es": "window_label_en"
                },
                {
                  "name": "window_label_es",
                  "label_en": "window_label_es",
                  "label_es": "window_label_es"
                },
                {
                  "name": "order_number",
                  "label_en": "order_number",
                  "label_es": "order_number"
                },
                {
                  "name": "roles",
                  "label_en": "roles",
                  "label_es": "roles"
                }
              ],
              "actions": [
                {
                  "actionName": "VIEW_UPDATE_REQ_SOLUTION_MAIN_INFO",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Update Info",
                      "label_es": "Modificar Información"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "selObjectPropertyName": "window_label_en",
                          "label_en": "Label(EN)",
                          "label_es": "Etiqueta(EN)"
                        }
                      },
                      {
                        "text2": {
                          "selObjectPropertyName": "window_label_es",
                          "label_en": "Label(ES)",
                          "label_es": "Etiqueta(ES)"
                        }
                      },
                      {
                        "text3": {
                          "selObjectPropertyName": "window_name",
                          "label_en": "Name",
                          "label_es": "Nombre"
                        }
                      },
                      {
                        "number1": {
                          "selObjectPropertyName": "order_number",
                          "label_en": "Position",
                          "label_es": "Posición"
                        }
                      },
                      {
                        "multilist1": {
                          "selObjectPropertyName": "roles",
                          "label_en": "Rols",
                          "label_es": "Roles"
                        }
                      },
                      {
                        "text4": {
                          "selObjectPropertyName": "window_mode",
                          "label_en": "Mode",
                          "label_es": "Modo"
                        }
                      },
                      {
                        "text5": {
                          "selObjectPropertyName": "window_type",
                          "label_en": "window_type",
                          "label_es": "window_type"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    },
                    {
                      "argumentName": "content_type",
                      "element": "text1",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    },
                    {
                      "argumentName": "window_type",
                      "element": "text2",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    },
                    {
                      "argumentName": "window_name",
                      "element": "text3",
                      "defaultValue": "",
                      "addToFieldNameAndValue": true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "View query properties",
            "label_es": "Propiedades de la consulta de la pantalla"
          },
          "elements": [
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "design",
                "viewQuery"
              ],
              "num_columns": 2,
              "fieldsToDisplay": [
                {
                  "name": "actionName",
                  "label_en": "Query name",
                  "label_es": "Nombre de la consulta"
                },
                {
                  "name": "addRefreshButton",
                  "label_en": "addRefreshButton",
                  "label_es": "addRefreshButton"
                },
                {
                  "name": "enableContextMenu",
                  "label_en": "enableContextMenu",
                  "label_es": "enableContextMenu"
                },
                {
                  "name": "addActionsInContextMenu",
                  "label_en": "addActionsInContextMenu",
                  "label_es": "addActionsInContextMenu"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "Table Filters",
                "label_es": "Filtros de la tabla"
              },
              "theme": "TRAZiT-DefinitionArea",
              "endPointPropertyArray": [
                "design",
                "viewQueryDesigner",
                "endPointParams"
              ],
              "columns": [
                {
                  "name": "argumentName",
                  "label_en": "Filter Name",
                  "label_es": "Nombre Filtro"
                },
                {
                  "name": "value",
                  "label_en": "Value",
                  "label_es": "Valor"
                }
              ],
              "row_buttons": [],
              "actions": [
                {
                  "actionName": "VIEW_ADD_TBL_ENDPOINT_PARAM",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "update",
                    "title": {
                      "label_en": "Add table filter",
                      "label_es": "Añadir filtro de la tabla"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "argumentName",
                          "label_es": "argumentName"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "argumentValue",
                          "label_es": "argumentValue"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "requirementId",
                      "selObjectPropertyName": "req_id"
                    },
                    {
                      "argumentName": "solutionId",
                      "selObjectPropertyName": "solution_id"
                    },
                    {
                      "argumentName": "tableId",
                      "selObjectPropertyName": "table_id"
                    },
                    {
                      "argumentName": "argumentName",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "argumentValue",
                      "element": "text2",
                      "defaultValue": ""
                    }
                  ]
                }                    
              ]
            }            
        
          ]
        },
        {
          "type": "readOnlyTable",
          "title": {
            "label_en": "Table Filters",
            "label_es": "Filtros de la tabla"
          },
          "theme": "TRAZiT-DefinitionArea",
          "endPointPropertyArray": [
            "design",
            "viewQueryDesigner",
            "endPointParams"
          ],
          "columns": [
            {
              "name": "argumentName",
              "label_en": "Filter Name",
              "label_es": "Nombre Filtro"
            },
            {
              "name": "value",
              "label_en": "Value",
              "label_es": "Valor"
            }
          ],
          "row_buttons": [],
          "actions": []
        },
        {
          "type": "readOnlyTable",
          "title": {
            "label_en": "Table Actions",
            "label_es": "Acciones de la tabla"
          },
          "theme": "TRAZiT-DefinitionArea",
          "endPointPropertyArray": [
            "design",
            "actions"
          ],
          "columns": [
            {
              "name": "actionName",
              "label_en": "Action name",
              "label_es": "Nombre de la acción"
            },
            {
              "name": "requiresDialog",
              "label_en": "Requires Dialog",
              "label_es": "Necesita Diálogo"
            }
          ],
          "row_buttons": [
            {
              "actionName": "REMOVE_ROLE",
              "notGetViewData": true,
              "clientMethod": "procMngRequirementsMethod",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "selectedItemPropertyName": "selectedItems",
              "requiresDialog": false,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "person_remove",
                "title": {
                  "label_en": "Remove role",
                  "label_es": "Borrar perfil"
                },
                "requiresGridItemSelected": false
              },
              "endPointParams": [
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "roleName",
                  "selObjectPropertyName": "role_name"
                }
              ]
            },
            {
              "actionName": "RENAME_ROLE",
              "notGetViewData": true,
              "clientMethod": "procMngRequirementsMethod",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "selectedItemPropertyName": "selectedItems",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "manage_accounts",
                "title": {
                  "label_en": "Rename role",
                  "label_es": "Renombrar perfil"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "New Role Name",
                      "label_es": "Nuevo Nombre Perfil",
                      "selObjectPropertyName": "role_name"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "roleName",
                  "selObjectPropertyName": "role_name"
                },
                {
                  "argumentName": "newroleName",
                  "element": "text1",
                  "defaultValue": ""
                }
              ]
            },
            {
              "actionName": "CLONE_ROLE",
              "notGetViewData": true,
              "clientMethod": "procMngRequirementsMethod",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "selectedItemPropertyName": "selectedItems",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "file_copy",
                "title": {
                  "label_en": "Clone Role",
                  "label_es": "Clonar Perfil"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "New Role Name",
                      "label_es": "Nuevo Nombre de Perfil",
                      "selObjectPropertyName": "role_name"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "roleName",
                  "selObjectPropertyName": "role_name"
                },
                {
                  "argumentName": "newroleName",
                  "element": "text1"
                }
              ]
            }
          ],
          "actions": [
            {
              "actionName": "ADD_ROLE",
              "notGetViewData": true,
              "clientMethod": "procMngRequirementsMethod",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "selectedItemPropertyName": "selectedItems",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "person_add",
                "title": {
                  "label_en": "Assign Role",
                  "label_es": "Asignar Perfil"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "dialogWidth": "500px",
                "fields": [
                  {
                    "text1": {
                      "label_en": "New Role name",
                      "label_es": "Nuevo Nombre de Perfil"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "roleName",
                  "element": "text1",
                  "defaultValue": ""
                }
              ]
            }
          ]
        },
        {
          "type": "readOnlyTable",
          "title": {
            "label_en": "Table Row Buttons",
            "label_es": "Botones de linea de la tabla"
          },
          "theme": "TRAZiT-DefinitionArea",
          "endPointPropertyArray": [
            "design",
            "row_buttons"
          ],
          "columns": [
            {
              "name": "actionName",
              "label_en": "Action name",
              "label_es": "Nombre de la acción"
            },
            {
              "name": "requiresDialog",
              "label_en": "Requires Dialog",
              "label_es": "Necesita Diálogo"
            }
          ],
          "row_buttons": [],
          "actions": []
        }
      ]
    }
  },
  {
    "name": "ProcDeployment",
    "title": {
      "label_en": "Procedure Deployment",
      "label_es": "Desplegar Proceso"
    },
    "expanded": false,
    "alternative_endpoint_data": "actionOutput",
    "view_definition": {
      "label_en": "Deploy Requirements",
      "label_es": "Desplegar Requerimientos",
      "hasDetail": true,
      "detail": {
        "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "actionName": "DEPLOY_REQUIREMENTS",
        "notGetViewData": true,
        "type": "actionWithFilter",
        "secondaryActionToPerform": {
          "name": "refreshSelProcData"
        },
        "button": {
          "label_en": "Run",
          "label_es": "Ejecutar"
        },
        "filterFields": [
          {
            "text1": {
              "label_en": "Proc Name",
              "label_es": "Proceso",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_name",
              "disabled": true
            }
          },
          {
            "number1": {
              "label_en": "Version",
              "label_es": "Versión",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_version",
              "disabled": true
            }
          },
          {
            "text2": {
              "label_en": "Instance Name",
              "label_es": "Instancia",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "proc_instance_name",
              "disabled": true
            }
          },
          {
            "text3": {
              "label_en": "Module Name",
              "label_es": "Nombre del Módulo",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "module_name",
              "disabled": true
            }
          },
          {
            "checkbox1": {
              "label_en": "Repositories and Base Tables",
              "label_es": "Repositorios y Tablas Base",
              "default_value": false
            }
          },
          {
            "checkbox8": {
              "label_en": "Module Tables and Fields",
              "label_es": "Tablas y Campos",
              "default_value": false
            }
          },
          {
            "checkbox2": {
              "label_en": "Procedure Info",
              "label_es": "Info de Proceso",
              "default_value": false
            }
          },
          {
            "checkbox3": {
              "label_en": "Procedure User & Roles",
              "label_es": "Usuarios y Perfiles",
              "default_value": false
            }
          },
          {
            "checkbox4": {
              "label_en": "SOPs",
              "label_es": "PNTs",
              "default_value": false
            }
          },
          {
            "checkbox5": {
              "label_en": "Views",
              "label_es": "Pantallas",
              "default_value": false
            }
          },
          {
            "checkbox6": {
              "label_en": "Assign SOPs to Users",
              "label_es": "Asignar PNTs a usuarios",
              "default_value": false
            }
          },
          {
            "checkbox7": {
              "label_en": "Business Rules",
              "label_es": "Reglas de Negocio",
              "default_value": false
            }
          },
          {
            "checkbox9": {
              "label_en": "Master Data",
              "label_es": "Datos Maestros",
              "default_value": false
            }
          }
        ],
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "element": "text1"
          },
          {
            "argumentName": "procedureVersion",
            "element": "number1"
          },
          {
            "argumentName": "procInstanceName",
            "element": "text2"
          },
          {
            "argumentName": "moduleName",
            "element": "text3"
          },
          {
            "argumentName": "deployRepositoriesAndProcTbls",
            "element": "checkbox1"
          },
          {
            "argumentName": "deployProcInfo",
            "element": "checkbox2"
          },
          {
            "argumentName": "deployProcUserRoles",
            "element": "checkbox3"
          },
          {
            "argumentName": "deployProcSopMetaData",
            "element": "checkbox4"
          },
          {
            "argumentName": "deployProcEvents",
            "element": "checkbox5"
          },
          {
            "argumentName": "deployProcSopsToUsers",
            "element": "checkbox6"
          },
          {
            "argumentName": "deployProcBusinessRulesPropFiles",
            "element": "checkbox7"
          },
          {
            "argumentName": "deployModuleTablesAndFields",
            "element": "checkbox8"
          },
          {
            "argumentName": "deployMasterData",
            "element": "checkbox9"
          }
        ],
        "filter": {
          "fixParams": {}
        }
      },
      "reportElements": [
        {
          "type": "cardSomeElementsSingleObject",
          "endPointResponseObject": "Procedure Instance Info",
          "title": "Main Information",
          "num_columns": 4,
          "fieldsToDisplay": [
            {
              "name": "dbName",
              "label_en": "Trazit Instance",
              "label_es": "Instancia de Trazit"
            },
            {
              "name": "Process Name",
              "label_en": "Procedure Name",
              "label_es": "Nombre de Proceso"
            },
            {
              "name": "Process Version",
              "label_en": "Procedure Version",
              "label_es": "Versión de Proceso"
            },
            {
              "name": "Instance Name",
              "label_en": "Instance",
              "label_es": "Instancia"
            }
          ]
        },
        {
          "type": "cardSomeElementsSingleObject",
          "endPointResponseObject": "actions_to_perform_settings",
          "title": "Sections Performed",
          "num_columns": 3,
          "fieldsToDisplay": [
            {
              "name": "1) CREATE_REPOSITORIES_AND_PROC_TBLS",
              "label_en": "Repositories and Proc Tables",
              "label_es": "repositorios y Tablas de Proceso"
            },
            {
              "name": "2) PROCDEPL_PROCEDURE_INFO",
              "label_en": "Procedure Info",
              "label_es": "Información de Proceso"
            },
            {
              "name": "3) PROCDEPL_PROCEDURE_USER_ROLES",
              "label_en": "Users and Roles",
              "label_es": "Usuarios y Roles"
            },
            {
              "name": "4) PROCDEPL_PROCEDURE_SOP_META_DATA",
              "label_en": "SOPs",
              "label_es": "PNTs"
            },
            {
              "name": "5) PROCDEPL_ASIGN_PROC_SOPS_TO_USERS",
              "label_en": "Assign SOPs to Users",
              "label_es": "Asignar PNTs a Usuarios"
            },
            {
              "name": "6) PROCDEPL_PROCEDURE_EVENTS",
              "label_en": "Menus",
              "label_es": "Menús"
            },
            {
              "name": "7) PROCDEPL_BUSINESS_RULES_PROPTS_FILS",
              "label_en": "Business Rules",
              "label_es": "Reglas de Negocio"
            },
            {
              "name": "8) PROCDEPL_MODULE_TABLES_AND_FIELDS",
              "label_en": "Tables and Fields",
              "label_es": "Tablas y Campos"
            },
            {
              "name": "9) PROCDEPL_MASTER_DATA",
              "label_en": "Master Data",
              "label_es": "Datos Maestros"
            }
          ]
        },
        {
          "type": "xjsonViewer",
          "title": "Information",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "Procedure Instance Info",
          "subheadingObj": "text1"
        },
        {
          "type": "xjsonViewer",
          "title": "Actions Log",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "actions_to_perform_settings",
          "subheadingObj": "text1"
        },
        {
          "type": "jsonViewer",
          "title": "Log Summary",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "sections_log",
          "subheadingObj": "text1"
        }
      ]
    }
  },
  {
    "name": "TESTING_SCRIPTS",
    "title": {
      "label_en": "Operational Testing Scripts",
      "label_es": "Guiones de Prueba Operacional"
    },
    "expanded": false,
    "alternative_endpoint_data": "testing",
    "view_definition": {
      "hasDetail": true,
      "detail": {
        "name": "TESTING_SCRIPTS",
        "type": "objectsList",
        "endPointPropertyArray": [
          "testing",
          "scripts"
        ],
        "conditionalColor": {
          "field": "run_summary",
          "includedWord": "SUCCESS",
          "classForTrue": "success",
          "classForFalse": "no_success"
        },
        "clickItemAction": "clickedTest",
        "fieldsToDisplayInFilter": [
          {
            "name": "script_id",
            "label_en": "Id",
            "label_es": "Id"
          },
          {
            "name": "run_summary",
            "label_en": "Summary",
            "label_es": "Resumen"
          }
        ],
        "view_definition": [
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            "elements": [
              {
                "type": "readOnlyTable",
                "endPointResponseObject": "ROOT",
                "columns": [
                  {
                    "name": "script_id",
                    "label_en": "Id",
                    "label_es": "Id"
                  },
                  {
                    "name": "run_summary",
                    "label_en": "Summary",
                    "label_es": "Resumen"
                  },
                  {
                    "name": "date_execution",
                    "label_en": "Run on",
                    "label_es": "Ejecutado en"
                  },
                  {
                    "name": "eval_total_tests",
                    "label_en": "Number of Steps",
                    "label_es": "Número de Pasos"
                  },
                  {
                    "label_en": "Syntax",
                    "label_es": "Sintáxis",
                    "fix_value_prefix": "Match: ",
                    "name": "eval_syntaxis_match",
                    "fix_value2_prefix": "UNmtch: ",
                    "name2": "eval_syntaxis_unmatch",
                    "fix_value3_prefix": "N/A:",
                    "name3": "eval_syntaxis_undefined"
                  },
                  {
                    "label_en": "Notification",
                    "label_es": "Notificación",
                    "fix_value_prefix": "Match: ",
                    "name": "eval_code_match",
                    "fix_value2_prefix": "UNmtch: ",
                    "name2": "eval_code_unmatch",
                    "fix_value3_prefix": "N/A:",
                    "name3": "eval_code_undefined"
                  },
                  {
                    "label_en": "Duration",
                    "label_es": "Duración",
                    "fix_value_prefix": "",
                    "name": "time_consume",
                    "fix_value2_prefix": " (",
                    " (name2": "time_started",
                    "fix_value3_prefix": " - ",
                    "name3": "time_completed",
                    "fix_value3_suffix": ") "
                  }
                ],
                "actions": [
                  {
                    "actionName": "TestingRegressionUAT",
                    "endPoint": "/testing/platform/TestingRegressionUAT",
                    "requiresDialog": false,
                    "certificationException": true,
                    "secondaryActionToPerformRefreshFail": {
                      "name": "testScriptPerformed"
                    },
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "button": {
                      "icon": "date_range",
                      "title": {
                        "label_en": "Run Testing",
                        "label_es": "Ejecutar Prueba"
                      },
                      "requiresGridItemSelected": false
                    },
                    "endPointParams": [
                      {
                        "argumentName": "scriptId",
                        "selObjectPropertyName": "script_id"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "procManagement",
                        "fixValue": "true"
                      },
                      {
                        "argumentName": "outputFormat",
                        "fixValue": "JSON"
                      }
                    ]
                  },
                  {
                    "actionName": "SCRIPT_ADD_STEP",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "requiresDialog": true,
                    "certificationException": true,
                    "secondaryActionToPerform": {
                      "name": "testScriptPerformed"
                    },
                    "button": {
                      "icon": "playlist_add",
                      "title": {
                        "label_en": "Add Step",
                        "label_es": "Añadir Paso"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "testScriptNewStepDialog",
                      "fields": [
                        {
                          "text1": {
                            "label_en": "New Production Lot Name",
                            "label_es": "Nombre para nuevo lote de producción"
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "scriptId",
                        "selObjectPropertyName": "script_id"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "procManagement",
                        "fixValue": "true"
                      },
                      {
                        "argumentName": "outputFormat",
                        "fixValue": "JSON"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Steps",
              "label_es": "Pasos"
            },
            "elements": [
              {
                "type": "readOnlyTable",
                "endPointResponseObject": "steps",
                "columns": [
                  {
                    "name": "step_id",
                    "label_en": "Id",
                    "label_es": "Id"
                  },
                  {
                    "name": "action_name",
                    "label_en": "Action",
                    "label_es": "Acción"
                  },
                  {
                    "name": "date_execution",
                    "label_en": "Run on",
                    "label_es": "Ejecutado en"
                  },
                  {
                    "name": "eval_total_tests",
                    "label_en": "Number of Steps",
                    "label_es": "Número de Pasos"
                  },
                  {
                    "label_en": "Syntax",
                    "label_es": "Sintáxis",
                    "is_icon": true,
                    "icon_name": "eval_syntaxis_icon",
                    "icon_class": "eval_syntaxis_class",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_syntaxis",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_syntaxis",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "label_en": "Notification",
                    "label_es": "Notificación",
                    "is_icon": true,
                    "icon_name": "eval_code_icon",
                    "icon_class": "eval_code_class",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_code",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_code",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "label_en": "Duration",
                    "label_es": "Duración",
                    "fix_value_prefix": "",
                    "name": "time_consume",
                    "fix_value2_prefix": " (",
                    " (name2": "time_started",
                    "fix_value3_prefix": " - ",
                    "name3": "time_completed",
                    "fix_value3_suffix": ") "
                  }
                ],
                "row_buttons": [
                  {
                    "actionName": "SCRIPT_UPDATE_STEP",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "requiresDialog": true,
                    "certificationException": true,
                    "secondaryActionToPerform": {
                      "name": "testScriptPerformed"
                    },
                    "button": {
                      "icon": "featured_play_list",
                      "title": {
                        "label_en": "Update Step",
                        "label_es": "Modificar Paso"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "testScriptUpdateStepDialog",
                      "fields": [
                        {
                          "text1": {
                            "label_en": "New Production Lot Name",
                            "label_es": "Nombre para nuevo lote de producción"
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "scriptId",
                        "selObjectPropertyName": "script_id"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "procManagement",
                        "fixValue": "true"
                      },
                      {
                        "argumentName": "outputFormat",
                        "fixValue": "JSON"
                      }
                    ]
                  },
                  {
                    "actionName": "SCRIPT_REMOVE_STEP",
                    "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                    "selectedItemPropertyName": "selectedItems",
                    "requiresDialog": false,
                    "certificationException": true,
                    "secondaryActionToPerform": {
                      "name": "refreshSelProcData"
                    },
                    "button": {
                      "icon": "playlist_remove",
                      "title": {
                        "label_en": "Remove Step",
                        "label_es": "Borrar Paso"
                      },
                      "requiresGridItemSelected": false
                    },
                    "endPointParams": [
                      {
                        "argumentName": "scriptId",
                        "selObjectPropertyName": "script_id"
                      },
                      {
                        "argumentName": "stepId",
                        "selObjectPropertyName": "step_id"
                      },
                      {
                        "argumentName": "procInstanceName",
                        "contextVariableName": "procInstanceName"
                      },
                      {
                        "argumentName": "procedureName",
                        "contextVariableName": "procedureName"
                      },
                      {
                        "argumentName": "procedureVersion",
                        "contextVariableName": "procedureVersion"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "reportElements": [
        {
          "type": "reportTitle",
          "title": {
            "label_en": "Testing scripts",
            "label_es": "Guiones de prueba"
          },
          "style": "color:blue",
          "endPointResponseObject": "scripts",
          "add_border": true,
          "elements": [
            {
              "type": "cardSomeElementsSingleObject",
              "endPointResponseObject": "scripts",
              "actions": [
                {
                  "actionName": "NEW_SCRIPT_TESTING",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "requiresDialog": true,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "New Testing Script",
                      "label_es": "Nuevo Script de Testeo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "Purpose",
                          "label_es": "Propósito",
                          "default_value": " ",
                          "optional": false
                        }
                      },
                      {
                        "checkbox1": {
                          "label_en": "Active?",
                          "label_es": "¿Activo?",
                          "default_value": true
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "purpose",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "active",
                      "element": "checkbox1",
                      "default_value": true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "xxxreadOnlyTable",
          "endPointResponseObject": "scripts",
          "columns": [
            {
              "name": "script_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "eval_total_tests",
              "label_en": "Number of Steps",
              "label_es": "Número de Pasos"
            },
            {
              "label_en": "Syntax",
              "label_es": "Sintáxis",
              "fix_value_prefix": "Match: ",
              "name": "eval_syntaxis_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_syntaxis_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_syntaxis_undefined"
            },
            {
              "label_en": "Notification",
              "label_es": "Notificación",
              "fix_value_prefix": "Match: ",
              "name": "eval_code_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_code_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_code_undefined"
            },
            {
              "label_en": "Duration",
              "label_es": "Duración",
              "fix_value_prefix": "",
              "name": "time_consume",
              "fix_value2_prefix": " (",
              " (name2": "time_started",
              "fix_value3_prefix": " - ",
              "name3": "time_completed",
              "fix_value3_suffix": ") "
            }
          ]
        },
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "scripts",
          "add_border": true,
          "fieldsToDisplay": [
            {
              "name": "script_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "eval_total_tests",
              "label_en": "Number of Steps",
              "label_es": "Número de Pasos"
            },
            {
              "label_en": "Syntax",
              "label_es": "Sintáxis",
              "fix_value_prefix": "Match: ",
              "name": "eval_syntaxis_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_syntaxis_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_syntaxis_undefined"
            },
            {
              "label_en": "Notification",
              "label_es": "Notificación",
              "fix_value_prefix": "Match: ",
              "name": "eval_code_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_code_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_code_undefined"
            },
            {
              "label_en": "Duration",
              "label_es": "Duración",
              "fix_value_prefix": "",
              "name": "time_consume",
              "fix_value2_prefix": " (",
              " (name2": "time_started",
              "fix_value3_prefix": " - ",
              "name3": "time_completed",
              "fix_value3_suffix": ") "
            }
          ],
          "actions": [
            {
              "actionName": "TESTING_SCRIPT_RUN",
              "endPoint": "/testing/platform/TestingRegressionUAT",
              "requiresDialog": false,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "date_range",
                "title": {
                  "label_en": "Run Test Script",
                  "label_es": "Ejecutar Guión de pruebas"
                },
                "requiresGridItemSelected": false
              },
              "endPointParams": [
                {
                  "argumentName": "scriptId",
                  "selObjectPropertyName": "script_id"
                },
                {
                  "argumentName": "procManagement",
                  "fixValue": "true"
                },
                {
                  "argumentName": "outputFormat",
                  "fixValue": "JSON"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "FRONTEND_TESTING_REPORTS",
    "title": {
      "label_en": "Graphic interface testing",
      "label_es": "Pruebas interfaz gráfica"
    },
    "expanded": false,
    "alternative_endpoint_data": "frontend_testing",
    "view_definition": {
      "reportElements": [
        {
          "type": "reportTitle",
          "title": {
            "label_en": "Graphic Interface Testing",
            "label_es": "Pruebas Interfaz Gráfica"
          },
          "elements": [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "endPointResponseObject": "root",
              "num_columns": 1,
              "add_border": true,
              "fieldsToDisplay": [
                {
                  "name": "area",
                  "label_en": "Area",
                  "label_es": "Area"
                },
                {
                  "name": "test_name",
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "description",
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                },
                {
                  "name": "last_execution_eval",
                  "label_en": "Eval",
                  "label_es": "Eval",
                  "fix_value2_prefix": " (last run: ",
                  "name2": "last_execution",
                  "fix_value2_suffix": " )"
                },
                {
                  "name": "report_url",
                  "as_ppt": true
                }
              ],
              "actions": [
                {
                  "clientMethod": "openSop",
                  "fieldWithUrl": "report_url",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "picture_as_pdf",
                    "title": {
                      "label_en": "Run Coverage Analysis",
                      "label_es": "Ejecutar Análisis de Cobertura"
                    },
                    "requiresGridItemSelected": false
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "TESTING_COVERAGE",
    "title": {
      "label_en": "Testing Coverage Analysis",
      "label_es": "Análisis Cobertura Pruebas"
    },
    "expanded": false,
    "alternative_endpoint_data": "testing",
    "view_definition": {
      "reportElements": [
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "coverage",
          "title": "Testing Script Coverage",
          "num_columns": 2,
          "fieldsToDisplay": [
            {
              "name": "coverage_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "script_ids_list",
              "label_en": "Scripts List",
              "label_es": "Lista de Guiones",
              "is_tag_list": true
            }
          ],
          "actions": [
            {
              "actionName": "TESTING_COVERAGE_RUN",
              "endPoint": "/testing/platform/TestingCoverageRun",
              "requiresDialog": false,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "coveragePerformed"
              },
              "button": {
                "icon": "date_range",
                "title": {
                  "label_en": "Run Coverage Analysis",
                  "label_es": "Ejecutar Análisis de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "endPointParams": [
                {
                  "argumentName": "coverageId",
                  "selObjectPropertyName": "coverage_id"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                }
              ]
            },
            {
              "actionName": "NEW_COVERAGE_TESTING",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "add",
                "title": {
                  "label_en": "New Coverage Testing",
                  "label_es": "Nuevo Test de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Script Id List",
                      "label_es": "Lista de Id del script",
                      "defaultValue": "Ex: 1|3|4|8"
                    }
                  },
                  {
                    "text2": {
                      "label_en": "Purpose",
                      "label_es": "Propósito",
                      "defaultValue": "",
                      "optional": true
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "scriptIdsList",
                  "element": "text1"
                },
                {
                  "argumentName": "purpose",
                  "element": "text2",
                  "defaultValue": ""
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                }
              ]
            },
            {
              "actionName": "DELETE_COVERAGE_TESTING",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "remove",
                "title": {
                  "label_en": "Remove Coverage Testing",
                  "label_es": "Borrar Test de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Coverage Id",
                      "label_es": "Id Test de Cobertura",
                      "selObjectPropertyName": "coverage_id",
                      "disabled": "true"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "coverageId",
                  "element": "text1"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                }
              ]
            },
            {
              "actionName": "COVERAGE_ADD_SCRIPT",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "add",
                "title": {
                  "label_en": "Add Script to Coverage",
                  "label_es": "Añadir Script de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Coverage Id",
                      "label_es": "Id Test de Cobertura",
                      "selObjectPropertyName": "coverage_id"
                    }
                  },
                  {
                    "number1": {
                      "label_en": "Script Id",
                      "label_es": "Id de Script",
                      "default_value": ""
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "coverageId",
                  "element": "text1"
                },
                {
                  "argumentName": "scriptId",
                  "element": "number1"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                }
              ]
            },
            {
              "actionName": "COVERAGE_REMOVE_SCRIPT",
              "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
              "requiresDialog": true,
              "certificationException": true,
              "secondaryActionToPerform": {
                "name": "refreshSelProcData"
              },
              "button": {
                "icon": "remove",
                "title": {
                  "label_en": "Remove Coverage Script",
                  "label_es": "Borrar Script de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Coverage Id",
                      "label_es": "Id Test de Cobertura",
                      "selObjectPropertyName": "coverage_id"
                    }
                  },
                  {
                    "text2": {
                      "label_en": "Script Id",
                      "label_es": "Id de Script",
                      "selObjectPropertyName": "script_ids_list"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "coverageId",
                  "element": "text1"
                },
                {
                  "argumentName": "scriptId",
                  "element": "text2"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                },
                {
                  "argumentName": "procedureName",
                  "contextVariableName": "procedureName"
                },
                {
                  "argumentName": "procedureVersion",
                  "contextVariableName": "procedureVersion"
                }
              ]
            }
          ]
        },
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "coverage",
          "title": "Testing Script Coverage",
          "num_columns": 3,
          "fieldsToDisplay": [
            {
              "name": "endpoints_coverage",
              "is_icon": true,
              "as_progress": true,
              "label_en": "Actions Coverage",
              "label_es": "Cobertura de Acciones"
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "Testing Coverage Detail",
            "label_es": "Detalle de la Cobertura de las pruebas"
          },
          "elements": [
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "coverage",
                "endpoints_summary_json",
                "summary"
              ],
              "num_columns": 1,
              "fieldsToDisplay": [
                {
                  "name": "percentage_explanation",
                  "label_en": "Explanation for Actions",
                  "label_es": "Explicación para Acciones"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "theme": "TRAZiT-DefinitionArea",
              "endPointPropertyArray": [
                "coverage",
                "endpoints_summary_json",
                "evaluation"
              ],
              "title": {
                "label_en": "Actions Evaluation",
                "label_es": "Evaluación de acciones"
              },
              "columns": [
                {
                  "name": "name",
                  "label_en": "Action",
                  "label_es": "Acción"
                },
                {
                  "name": "evaluation",
                  "label_en": "Evaluation",
                  "label_es": "Evaluación"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "COVERAGE_EXCLUDE_ACTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "hideWhenSelectedItem": {
                      "column": "evaluation",
                      "value": "excluded"
                    },
                    "icon": "person_remove",
                    "title": {
                      "label_en": "Exclude action",
                      "label_es": "Excluir acción"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "action",
                      "selObjectPropertyName": "name"
                    },
                    {
                      "argumentName": "coverageId",
                      "selObjectPropertyName": "coverage_id"
                    }
                  ]
                },
                {
                  "actionName": "COVERAGE_UNEXCLUDE_ACTION",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "showWhenSelectedItem": {
                      "column": "evaluation",
                      "value": "excluded"
                    },
                    "icon": "history",
                    "title": {
                      "label_en": "Un-exclude action",
                      "label_es": "Retornar acción"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "action",
                      "selObjectPropertyName": "name"
                    },
                    {
                      "argumentName": "coverageId",
                      "selObjectPropertyName": "coverage_id"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "DEFINITION_CHECKER",
    "title": {
      "label_en": "Definition Checker",
      "label_es": "Verificar Definición"
    },
    "expanded": false,
    "view_definition": {
      "hasDetail": true,
      "detail": {
        "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "actionName": "DEFINITION_CHECKER",
        "notGetViewData": true,
        "type": "actionWithFilter",
        "button": {
          "label_en": "Run",
          "label_es": "Ejecutar"
        },
        "filterFields": [
          {
            "text1": {
              "label_en": "Proc Name",
              "label_es": "Proceso",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_name",
              "disabled": true
            }
          },
          {
            "number1": {
              "label_en": "Version",
              "label_es": "Versión",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_version",
              "disabled": true
            }
          },
          {
            "text2": {
              "label_en": "Instance Name",
              "label_es": "Instancia",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "proc_instance_name",
              "disabled": true
            }
          },
          {
            "text3": {
              "label_en": "Module Name",
              "label_es": "Nombre del Módulo",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "module_name",
              "disabled": true
            }
          }
        ],
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "element": "text1"
          },
          {
            "argumentName": "procedureVersion",
            "element": "number1"
          },
          {
            "argumentName": "procInstanceName",
            "element": "text2"
          },
          {
            "argumentName": "moduleName",
            "element": "text3"
          }
        ],
        "filter": {
          "fixParams": {}
        },
        "fieldsToDisplayInFilter": [],
        "view_definition": [
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            "elements": []
          },
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Steps",
              "label_es": "Pasos"
            },
            "elements": [
              {
                "type": "readOnlyTable",
                "theme": "TRAZiT-DefinitionArea",
                "endPointResponseObject": "steps",
                "columns": [
                  {
                    "name": "step_id",
                    "label_en": "Id",
                    "label_es": "Id"
                  },
                  {
                    "name": "action_name",
                    "label_en": "Action",
                    "label_es": "Acción"
                  },
                  {
                    "name": "date_execution",
                    "label_en": "Run on",
                    "label_es": "Ejecutado en"
                  },
                  {
                    "name": "eval_total_tests",
                    "label_en": "Number of Steps",
                    "label_es": "Número de Pasos"
                  },
                  {
                    "label_en": "Sintaxis",
                    "label_es": "Sintáxis",
                    "is_icon": true,
                    "icon_name": "eval_syntaxis_icon",
                    "icon_class": "eval_syntaxis_class",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_syntaxis",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_syntaxis",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "label_en": "Notification",
                    "label_es": "Notificación",
                    "is_icon": true,
                    "icon_name": "eval_code_icon",
                    "icon_class": "eval_code_class",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_code",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_code",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "label_en": "Duration",
                    "label_es": "Duración",
                    "fix_value_prefix": "",
                    "name": "time_consume",
                    "fix_value2_prefix": " (",
                    " (name2": "time_started",
                    "fix_value3_prefix": " - ",
                    "name3": "time_completed",
                    "fix_value3_suffix": ") "
                  }
                ]
              }
            ]
          }
        ]
      },
      "reportElements": [
        {
          "type": "jsonViewer",
          "endPointResponseObject": "root",
          "add_border": true
        }
      ]
    }
  },
  {
    "name": "MODULE_ACTIONS_MANUALS",
    "title": {
      "label_en": "Manuals",
      "label_es": "Manuales"
    },
    "expanded": false,
    "alternative_endpoint_data": "manuals",
    "view_definition": {
      "reportElements": [
        {
          "type": "reportTitle",
          "title": {
            "label_en": "PROCEDURE MANUALS",
            "label_es": "MANUALES DEL PROCESO"
          },
          "elements": [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "endPointResponseObject": "root",
              "num_columns": 1,
              "add_border": true,
              "fieldsToDisplay": [
                {
                  "name": "manual_name",
                  "label_en": "Name",
                  "label_es": "Nombre",
                  "fix_value2_prefix": " v",
                  "name2": "manual_version"
                },
                {
                  "name": "description",
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                },
                {
                  "name": "file_link",
                  "as_ppt": true
                }
              ],
              "actions": [
                {
                  "clientMethod": "openSop",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "secondaryActionToPerform": {
                    "name": "refreshSelProcData"
                  },
                  "button": {
                    "icon": "picture_as_pdf",
                    "title": {
                      "label_en": "Run Coverage Analysis",
                      "label_es": "Ejecutar Análisis de Cobertura"
                    },
                    "requiresGridItemSelected": false
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
]