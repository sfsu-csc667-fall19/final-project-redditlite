const Models = require('../models');

const authorEXCLUDES = '-password -__v -_id' // exclude these fields

const createNote = (noteObj) => {
    return new Promise((resolve, reject) => {
        Models.note
        .create(noteObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const editNote = (newNoteObj) => {
    return new Promise((resolve, reject) => {
        Models.note
        .findById(newNoteObj._id)
        .populate('author', authorEXCLUDES).exec( (error, note) => {
            if (error) {
                reject(error);
            } else {
                note = Object.assign(note, newNoteObj);
                note.save((error, newObj) => resolve(newObj));
            }
        });
    })
};

const find = (query) => {
    return new Promise((resolve, reject) => {
        Models.note
        .find(query)
        .populate('author', authorEXCLUDES).exec( (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}



module.exports = {
    find: find,
    edit: editNote,
    create: createNote
}

