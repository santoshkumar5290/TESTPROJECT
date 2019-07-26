var TEMP = [{
    "code": "byBarcode",
    "label": "Search Barcode",
    "selected": true,
    "params": {
        "condition":[{
            "code": "searchPattern",
            "label": "barcode",
            "placeholders": ["Enter Barcode Number..."],
            "unit": "",
            "dataType": "STRING",
            "type":"TEXT",
            "required": true,
            "isVisible": true
        }],
        "subCondition":[{
            "code": "startDate",
            "label": "Start Date & Time",
            "placeholders": ["Select Date", "Select Time"],
            "unit": "",
            "dataType": "DATETIME",
            "type":"DATE",
            "required": true,
            "isVisible": true
        }, {
            "code": "endDate",
            "label": "End Date & Time",
            "placeholders": ["Select Date", "Select Time"],
            "unit": "",
            "dataType": "DATETIME",
            "type":"DATE",
            "required": true,
            "isVisible": true
        },{
            "code": "today",
            "label": "Today",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "week",
            "label": "This Week",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "month",
            "label": "This Month",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "facility",
            "label": "Facility",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"DROPDOWN",
            "required": true,
            "isVisible": true
        }] 
    }
},
{
    "code": "byDimensions",
    "label": "Search Dimensions",
    "entityType": "OBJECT",
    "selected": false,
    "params" : {
        "condition": [{
            "code": "Length",
            "label": "Select Length",
            "placeholders": ["Min","Max"],
            "unit": "Inches",
            "dataType": "FLOAT",
            "type":"NUMBER",
            "required": true,
            "isVisible": true
        }, {
            "code": "Width",
            "label": "Select Width",
            "placeholders": ["Min","Max"],
            "unit": "Inches",
            "dataType": "FLOAT",
            "type":"NUMBER",
            "required": true,
            "isVisible": true
        },{
            "code": "Height",
            "label": "Select Height",
            "placeholders": ["Min","Max"],
            "unit": "Inches",
            "group": "height",
            "dataType": "FLOAT",
            "type":"NUMBER",
            "required": true,
            "isVisible": true
        }],
        "subCondition":[{
            "code": "startDate",
            "label": "Start Date & Time",
            "placeholders": ["Select Date", "Select Time"],
            "unit": "",
            "dataType": "DATETIME",
            "type":"DATE",
            "required": true,
            "isVisible": true
        }, {
            "code": "endDate",
            "label": "End Date & Time",
            "placeholders": ["Select Date", "Select Time"],
            "unit": "",
            "dataType": "DATETIME",
            "type":"DATE",
            "required": true,
            "isVisible": true
        },{
            "code": "today",
            "label": "Today",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "week",
            "label": "This Week",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "month",
            "label": "This Month",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"BUTTON",
            "required": true,
            "isVisible": true
        }, {
            "code": "facility",
            "label": "Facility",
            "placeholders": [],
            "unit": "",
            "dataType": "STRING",
            "type":"DROPDOWN",
            "required": true,
            "isVisible": true
        }]  
    }
}]

export default TEMP;