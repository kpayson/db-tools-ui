var details = {
    "appFlags": {
        "applId": 10338870,
        "ota": false,
        "dataActReportable": true,
        "revisionModelSupported": false,
        "authoritativeModelSupported": true,
        "termsSupported": true,
        "milestonesSupported": false,
        "synchSubprojectsEnabled": true
    },
    "assignedTerms": [
        {
            "sectionName": "Remarks",
            "tcAssignments": [
                {
                    "tcaId": 172045,
                    "tcId": 251,
                    "applId": 10338870,
                    "tcName": "BSCA New Multi-Year Award    -Rev 2",
                    "tcContent": "content...",
                    "trackedFlag": false,
                    "includeNoaFlag": false,
                    "revisionNum": "Rev 2",
                    "versionCode": "A"
                },
                {
                    "tcaId": 178422,
                    "tcId": 209,
                    "applId": 10338870,
                    "tcName": "PATH TA Supplement    -WIP",
                    "tcContent": "content...",
                    "trackedFlag": false,
                    "includeNoaFlag": true,
                    "revisionNum": "WIP",
                    "versionCode": "W"
                }
            ]
        },
        {
            "sectionName": "Special Terms",
            "tcAssignments": [
                {
                    "tcaId": 172046,
                    "tcId": 94,
                    "applId": 10338870,
                    "tcName": "Disparity Impact Statement (DIS)    -Rev 3",
                    "tcContent": "content...",
                    "trackedFlag": true,
                    "includeNoaFlag": false,
                    "revisionNum": "Rev 3",
                    "versionCode": "A",
                    "tcAssignmentTracking": [
                        {
                            "tcaId": 172046,
                            "tcaTrackingId": 70094,
                            "trackingStatusCode": "UNRESOLVED",
                            "trackingStatusCodeDescr": "Unresolved",
                            "dueDateDescription": "Disparity Impact Statement",
                            "dueDate": "02/28/2023",
                            "includeNoaFlag": false
                        }
                    ]
                },
                {
                    "tcaId": 172047,
                    "tcId": 135,
                    "applId": 10338870,
                    "tcName": "Risk Assessment    -Rev 4",
                    "tcContent": "content...",
                    "trackedFlag": false,
                    "includeNoaFlag": false,
                    "revisionNum": "Rev 4",
                    "versionCode": "A"
                },
                {
                    "tcaId": 172048,
                    "tcId": 195,
                    "applId": 10338870,
                    "tcName": "SPARS    -Rev 2",
                    "tcContent": "content...",
                    "trackedFlag": false,
                    "includeNoaFlag": false,
                    "revisionNum": "Rev 2",
                    "versionCode": "A"
                },
                {
                    "tcaId": 172125,
                    "tcId": 82,
                    "applId": 10338870,
                    "tcName": "Lobbying Restriction Reminder    -Initial",
                    "tcContent": "content...",
                    "trackedFlag": false,
                    "includeNoaFlag": false,
                    "revisionNum": "Initial",
                    "versionCode": "A"
                }
            ]
        }
    ]
};

detailsWithSortedAssignments = {
    ...details, 
    assignedTerms: (details.assignedTerms || [])
        .map(term=>({
            ...term, 
            tcAssignments: (term.tcAssignments || [])
            .sort((a,b)=>{
                if(! a.revisionNum){return -1;}
                else if(! b.revisionNum){return 1;}
                else if (a.revisionNum < b.revisionNum){return -1;}
                else if (a.revisionNum > b.revisionNum){return 1;}
                else {return 0;}
            })
        })) 
};


console.log(JSON.stringify(detailsWithSortedAssignments,null,4));