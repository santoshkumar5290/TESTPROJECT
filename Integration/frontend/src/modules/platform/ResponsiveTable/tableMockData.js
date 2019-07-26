export const tableConfig = {
    "type": "Facility",
    "name": "Facility Table",
    "header": {
          "tabs": [{
                "index": 0,
                "label": "Facility",
                "visible": true,
                "url": "/data/facilityTab/01",
                "channel": "facility",
                "group": "FACILITY",
                "expanded": true,
                "resizeAble": true,
                "defaultColumn":{
                      "index":0,
                      "property":"column1"
                },
                "columns": [{
                      "index": 0,
                      "property": "column1",
                      "dataType": "STRING",
                      "header": {
                            "label": "Facility Name"
                      },

                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 200,
                      "children": []
                }, {
                      "index": 1,
                      "property": "column2",
                      "dataType": "STRING",
                      "header": {
                            "label": "Facility Label"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 120,
                      "min-width": 80,
                      "max-width": "auto",
                      "children": []
                }, {
                      "index": 2,
                      "property": "column3",
                      "dataType": "STRING",
                      "header": {
                            "label": "Region"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 120,
                      "children": []
                }, {
                      "index": 3,
                      "property": "column4",
                      "dataType": "STRING",
                      "header": {
                            "label": "Group"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 120,
                      "children": []
                }, {
                      "index": 4,
                      "property": "column5",
                      "dataType": "STATE",
                      "header": {
                            "label": "Health State"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 140,
                      "children": []
                }, {
                      "index": 5,
                      "property": "column6",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "Total Packages"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 130,
                      "children": []
                }, {
                      "index": 6,
                      "property": "column7",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "Packages Per Hour"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 130,
                      "children": []
                },
                {
                      "index": 7,
                      "property": "column8",
                      "dataType": "STRING",
                      "header": {
                            "label": "Condition"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 140,
                      "children": []
                }, {
                      "index": 8,
                      "property": "column9",
                      "dataType": "FLOAT",
                      "header": {
                            "label": "Condition Read Rate"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 160,
                      "children": []
                }
                ]
          }, {
                "index": 1,
                "label": "Enterprise",
                "visible": false,
                "url": "/data/enterprise/01",
                "channel": "enterprise",
                "group": "ENTERPRISE",
                "columns": [{
                      "index": 0,
                      "property": "column1",
                      "dataType": "STRING",
                      "header": {
                            "label": "Facility Name new"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }, {
                      "index": 1,
                      "property": "column2",
                      "dataType": "STRING",
                      "header": {
                            "label": "System 01 new"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }, {
                      "index": 2,
                      "property": "column3",
                      "dataType": "STRING",
                      "header": {
                            "label": "Region"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 140,
                      "children": []
                }, {
                      "index": 3,
                      "property": "column4",
                      "dataType": "STRING",
                      "header": {
                            "label": "Group"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 130,
                      "children": []
                }, {
                      "index": 4,
                      "property": "column5",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "numeric data"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 170,
                      "children": []
                }, {
                      "index": 5,
                      "property": "column6",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "Total Packages"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 170,
                      "children": []
                }, {
                      "index": 6,
                      "property": "column7",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "numeric data"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 170,
                      "children": []
                }, {
                      "index": 7,
                      "property": "column8",
                      "dataType": "STRING",
                      "header": {
                            "label": "Total Packages"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 170,
                      "children": []
                }
                ]
          }, {
                "index": 2,
                "label": "Third",
                "visible": false,
                "url": "/data/Third/01",
                "channel": "third",
                "group": "THIRD",
                "expanded": true,
                "resizeAble": true,
                "columns": [{
                      "index": 0,
                      "property": "column1",
                      "dataType": "STRING",
                      "header": {
                            "label": "Facility Group Name"
                      },
                      "expanded": true,
                      "sorting": true,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }, {
                      "index": 1,
                      "property": "column2",
                      "dataType": "LONGSTRING",
                      "header": {
                            "label": "facilities"
                      },
                      "expanded": false,
                      "sorting": true,
                      "resizeBar": false,
                      "active": true,
                      "visible": true,
                      "width": 430,
                      "children": []
                }
                ]
          }, {
                "index": 3,
                "label": "Forth",
                "visible": false,
                "url": "/data/Forth/01",
                "channel": "forth",
                "group": "FORTH",
                "expanded": true,
                "resizeAble": true,
                "columns": [{
                      "index": 0,
                      "property": "column1",
                      "dataType": "STRING",
                      "header": {
                            "label": "File Name"
                      },
                      "expanded": true,
                      "sorting": true,
                      "resizeBar": false,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }, {
                      "index": 1,
                      "property": "column2",
                      "dataType": "INTEGER",
                      "header": {
                            "label": "Size"
                      },
                      "expanded": false,
                      "sorting": false,
                      "resizeBar": false,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }, {
                      "index": 2,
                      "property": "column3",
                      "dataType": "DATE",
                      "header": {
                            "label": "Date Modified"
                      },
                      "expanded": false,
                      "sorting": true,
                      "resizeBar": false,
                      "active": true,
                      "visible": true,
                      "width": 150,
                      "children": []
                }
                ]
          }
          ]
    },
    "tip": {
          "label": "Click on icon to expand the column",
          "icon": "bulb",
          "visible": true

    },
    "subheader": [
          {
                "type": "icon",
                "icon": "search",
                "visible": true,
                "filter": []
          },
          {
                "type": "dropdown",
                "icon": "tab/button",
                "visible": false,
                "filter": [{ "name": "val1" }, { "name": "val2" }, { "name": "val3" }]
          },
          {
                "type": "icon",
                "icon": "edit",
                "visible": true,
                "filter": []
          },
          {
                "type": "button",
                "icon": null,
                "visible": true,
                "filter": [],
                "value": "CANCEL"
          }, {
                "type": "button",
                "icon": null,
                "visible": true,
                "filter": [],
                "value": "DOWNLOAD"
          }
    ]
}


export const tableRows = {
    "id": "jfgjsdg3472390rk3ejksdhf9048534rwer",
    "rows": [
          {
                "rowId": "row1",
                "rowName": "oneRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "North Ava",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 01",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "EPAC",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Iceland",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Good",
                                  "valueColor": "success2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 1
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "1732",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "1532",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "98.20%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row2",
                "rowName": "twoRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Lake Prudencefort",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 02",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "APSG",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Vanuatu",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Good",
                                  "valueColor": "success2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 1
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "1532",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "122",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "93.00%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row3",
                "rowName": "threeRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Garrettborough",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 03",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "America",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Bruneient",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Good",
                                  "valueColor": "success2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 1
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "12222",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "10122",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "91.44%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row4",
                "rowName": "forthRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Myriamfort",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 04",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "ASEAN",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Malaysia",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Good",
                                  "valueColor": "success2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 1
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "854",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "566",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "88.02%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row5",
                "rowName": "fifthRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Kennafort",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 05",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "LEVANT",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Sudan",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Danger",
                                  "valueColor": "accent2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 2
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "343",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "121",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "70.43%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row6",
                "rowName": "sixRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Modestochester",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 06",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "SEEMANE",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Niger",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Danger",
                                  "valueColor": "accent2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 2
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "2343",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "2222",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "65.89%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row7",
                "rowName": "sevenRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "Reneeview",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 07",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "EPAC",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "United Kingdom",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "Danger",
                                  "valueColor": "accent2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 2
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "1732",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "1000",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 4, "value": "Valid Read2" },
                                        { "id": 3, "value": "Valid Dim2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "55.32%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row8",
                "rowName": "eightRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "North Orlando North",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 08",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "APSG",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Congo",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "High Risk",
                                  "valueColor": "risk2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 3
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "12222",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "1432",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 4, "value": "Valid Read2" },
                                        { "id": 3, "value": "Valid Dim2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "45.65%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row9",
                "rowName": "nineRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "New Andy",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 09",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "ASEAN",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "Cook Island",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "High Risk",
                                  "valueColor": "risk2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 3
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "12222",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "1534",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "34.44%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          },
          {
                "rowId": "row10",
                "rowName": "tenRow",
                "edit": false,
                "delete": false,
                "columnData": [
                      {
                            "id": "column1",
                            "cellData": {
                                  "id": "column1",
                                  "dataType": "LINK",
                                  "value": "North Arvillashir",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column2",
                            "cellData": {
                                  "id": "column2",
                                  "dataType": "STRING",
                                  "value": "System 10",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column3",
                            "cellData": {
                                  "id": "column3",
                                  "dataType": "STRING",
                                  "value": "LEVANT",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column4",
                            "cellData": {
                                  "id": "column4",
                                  "dataType": "STRING",
                                  "value": "United States",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column5",
                            "cellData": {
                                  "id": "column5",
                                  "dataType": "STATE",
                                  "value": "High Risk",
                                  "valueColor": "risk2Color",
                                  "href": null,
                                  "metaData": null,
                                  "level": 3
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column6",
                            "cellData": {
                                  "id": "column6",
                                  "dataType": "INTEGER",
                                  "value": "451",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column7",
                            "cellData": {
                                  "id": "column7",
                                  "dataType": "INTEGER",
                                  "value": "100",
                                  "valueColor": "grey500",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column8",
                            "cellData": {
                                  "id": "column8",
                                  "dataType": "DROPDOWN",
                                  "value": [
                                        { "id": 1, "value": "Valid Dim" },
                                        { "id": 2, "value": "Valid Read" },
                                        { "id": 3, "value": "Valid Dim2" },
                                        { "id": 4, "value": "Valid Read2" }
                                  ],
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      },
                      {
                            "id": "column9",
                            "cellData": {
                                  "id": "column9",
                                  "dataType": "COLLAPSEBUTTON",
                                  "value": "22.40%",
                                  "valueColor": "Blue",
                                  "href": null,
                                  "metaData": null,
                                  "level": null
                            },
                            "hasSubColumns": false,
                            "subColumnData": null
                      }
                ]
          }
    ]
}
