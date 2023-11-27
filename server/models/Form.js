const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    // Define the structure of your form data
    gridLayout: {
        rows: Number,
        cols: Number
    },
    fields: [{
        fieldType: String,
        name: String,
        placeholder: String,
        value: String,
        width: String,
        row: Number,
        col: Number,
        rowSpan: Number,
        colSpan: Number
    }],
    // Add any other properties you need
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
