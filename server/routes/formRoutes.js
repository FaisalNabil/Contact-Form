const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

//POST endpoint to save form
router.post('/save-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log("formData"); 
        // Save formData to your database
        const savedForm = await Form.create(formData);
        res.status(200).json({ message: 'Form saved successfully', savedForm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form' });
    }
});

// GET endpoint to fetch all forms
router.get('/get-form', async (req, res) => {
    try {
        const forms = await Form.find({});
        console.log(forms);
        res.status(200).json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching forms' });
    }
});

// Example PUT endpoint in your Node.js server
router.put('/update-form/:formId', async (req, res) => {
    const formId = req.params.formId;
    const formData = req.body;

    try {
        const updatedForm = await Form.findByIdAndUpdate(formId, formData, { new: true });
        res.status(200).json({ message: 'Form updated successfully', updatedForm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating form' });
    }
});

// DELETE route to delete a form
router.delete('/delete-form/:formId', async (req, res) => {
    try {
        const { formId } = req.params;
        console.log(formId);
        const deletedForm = await Form.findByIdAndDelete(formId);
        console.log(deletedForm);

        if (deletedForm) {
            res.status(200).json({ message: 'Form deleted successfully' });
        } else {
            res.status(404).json({ message: 'Form not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting form' });
    }
});

module.exports = router;
