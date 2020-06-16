const request   = require('../db_apis/request.js');
const session   = require('express-session');
const oracledb  = require('oracledb');
const database  = require('../services/database.js');

const requestData = (req) => {
    // const loggedIn = session.username;
    // const user = loggedIn.split('|');
    const requestID = [];
    const requestRemarks = [];

    req.body.reqDetails.forEach(element => {
        requestID.push(parseInt(element.request));
        requestRemarks.push(element.remarks);
    });

    const data = {     
        date_required: req.body.reqDateRequired,
        machine: req.body.reqMachine,
        department: req.body.reqDepartment,
        notes: req.body.reqNotes,
        request_id: requestID,
        request_remarks: requestRemarks,
        status: 'pending',
        created_by: req.body.created_by,
        recipient: parseInt(req.body.reqRecipient),
        reviewed_by: 0,
        approved_by: 0,
        date_reviewed: null,
        date_approved: null,
        updated_at: null,
        priority: req.body.reqPriority
    };

    const data2 = { request_id: requestID }

    return data2;
};

const baseQuery = 
  `BEGIN MY_PKG.create_requests(:req_id,
                            :req_priority,
                            :rep_id,
                            :date_required,
                            :req_notes,
                            :rep_person_id,
                            :created_by,
                            :approved_by,
                            :status,
                            :inbv,
                            :success); END;`;

const requestPost = async (req, res, next) => {
    
    // console.log(baseQuery)

    let connect;
    connect = await oracledb.getConnection();
    const RecTypeClass = await connect.getDbObjectClass("xxdom.t_rectype");


    const reqDtlIDs  = [];
    const reqTypeIDs = [];
    const reqRemarks = [];
    const reqRows = [];

    req.body.reqDetails.forEach(element => {
        // reqDtlIDs.push(parseInt(element.dtl_id))
        // reqTypeIDs.push(parseInt(element.request));
        // reqRemarks.push(element.remarks);

        const json = {REQ_DTL_ID: parseInt(element.dtl_id),
                    REQ_REMARKS: element.remarks,
                    SR_TYPE_ID: parseInt(element.request)};

        reqRows.push(json);
        

    });

    const binds = {
        req_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.query.request_id)
        },
        req_priority: {
            type: oracledb.VARCHAR,
            dir: oracledb.BIND_IN,
            val: req.body.reqPriority
        },
        rep_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.body.reqRepresentative)
        },
        date_required: {
            type: oracledb.VARCHAR,
            dir: oracledb.BIND_IN,
            val: req.body.reqDateRequired
        },
        req_notes: {
            type: oracledb.VARCHAR,
            dir: oracledb.BIND_IN,
            val: req.body.reqNotes
        },
        rep_person_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.body.reqRepPersonID)
        },
        created_by: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.body.createdBy)
        },
        approved_by: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.body.reqRecipient) || parseInt(req.body.createdBy)
        },
        status: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: parseInt(req.body.status)
        },
        // reqDtlIDs: {
        //     type: oracledb.NUMBER,
        //     dir: oracledb.BIND_IN,
        //     val: reqDtlIDs
        // },
        // reqTypeIDs: {
        //     type: oracledb.NUMBER,
        //     dir: oracledb.BIND_IN,
        //     val: reqTypeIDs
        // },
        // reqRemarks: {
        //     type: oracledb.VARCHAR,
        //     dir: oracledb.BIND_IN,
        //     val: reqRemarks
        // },
        inbv: { 
            type: RecTypeClass, 
            dir: oracledb.BIND_IN,
            val: reqRows },
        success: {
            dir: oracledb.BIND_OUT,
            type: oracledb.VARCHAR
        }
    }

    console.log(binds);

    try {
        const result = await database.simpleExecute(baseQuery, binds);

        res.status(201).json(result.outBinds);

    } catch (err) {
        next(err);
    }
};

module.exports.request = requestPost;

const getAllRequest = async (req, res, next) => {
    const result = await request.all();
    res.status(200).json(result);
};

module.exports.getAllRequest = getAllRequest;

const getAllRequestById = async (req, res, next) => {
    const result = await request.allById(req);
    res.status(200).json(result);
};

module.exports.getAllRequestById = getAllRequestById;

const getRequestById = async (req, res, next) => {
    try {
        id = req.params.id;
        const json = {
            id
        };
    
        const resultRequest = await request.getRequestById(json);
        const resultDetails = await request.getRequestDetailsById(json);

        const result = {
            request: resultRequest,
            details: resultDetails
        };

        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

module.exports.getRequestById = getRequestById;

const updateRequest = async (req, res, next) => {
    try {
        const result = await request.updateStatus(req);
    
        res.status(200).json(result.outBinds);
    } catch (err) {
        next(err);
    }
};

module.exports.updateRequest = updateRequest;

const updateRequestDetails = async (req, res, next) => {
    try {
        const result = await request.updateRequestDetails(req);
        
        res.status(200).json(result.outBinds);
    } catch (err) {
        next(err);
    }
};

module.exports.updateRequestDetails = updateRequestDetails;

const transfer = async (req, res, next) => {
    try {
        const result = await request.transfer(req);

        res.status(200).json(result.outBinds);
    } catch (err) {
        next(err);
    }
};

module.exports.transfer = transfer;