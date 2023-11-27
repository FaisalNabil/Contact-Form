import React, { useState/*, useEffect*/ } from 'react';
import FormField from '../FormField/FormField';
import Modal from '../../pages/Modal';
import { Box, Button, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './FormBuilder.css';
import HistoryModal from '../../pages/HistoryModal';
//import History from '../History/History';
//import { useLocation } from 'react-router-dom';

const FormBuilder = () => {
    const [gridLayout, setGridLayout] = useState({ rows: 3, cols: 3 });
    const [formFields, setFormFields] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    
    /*const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.selectedForm) {
            // Load the form data for editing
            const { gridLayout, fields } = location.state.selectedForm;
            setGridLayout(gridLayout);
            setFormFields(fields);
        }
    }, [location.state]);*/

    const addField = (fieldData) => {
        setFormFields([...formFields, fieldData]);
    };

    const deleteField = (index) => {
        const newFormFields = formFields.filter((_, i) => i !== index);
        setFormFields(newFormFields);
    };

    const getGridStyle = () => {
        // Return styles for the CSS grid based on gridLayout state
        return {
            display: 'grid',
            gridTemplateRows: `repeat(${gridLayout.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${gridLayout.cols}, 1fr)`,
            gap: '10px', // Adjust the gap as needed
            // ... any other grid styles ...
        };
    };

    const handleFieldChange = (index, event) => {
        const updatedFields = formFields.map((field, i) => {
            if (i === index) {
                return { ...field, [event.target.name]: event.target.value };
            }
            return field;
        });
        setFormFields(updatedFields);
    };

    const handleGridLayoutChange = (event) => {
        const { name, value } = event.target;
        setGridLayout(prevLayout => ({
            ...prevLayout,
            [name]: value
        }));
    };

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    
    const saveOrUpdateForm = async () => {
        if (formFields.some(field => !field.fieldType || !field.name)) {
            alert('Each field must have a type and a name.');
            return;
        }
    
        const formData = {
            name: formName, // Assuming formName is a state that stores the name of the form
            gridLayout: gridLayout,
            fields: formFields,
            createdAt: selectedForm ? selectedForm.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    
        const url = selectedForm
            ? `${serverUrl}/api/forms/update-form/${selectedForm._id}`
            : `${serverUrl}/api/forms/save-form`;
    
        const method = selectedForm ? 'PUT' : 'POST';
    
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(`Form ${selectedForm ? 'updated' : 'saved'} successfully.`);
                if (!selectedForm) {
                    setSelectedForm(result); // Assuming the server returns the saved form
                }
            } else {
                console.error('Failed to save/update form data');
                alert('Failed to save/update the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };
    

    const saveForm = async () => {
        const url = `${serverUrl}/api/forms/save-form`;
        const formData = {
            gridLayout: gridLayout,
            fields: formFields
        };

        console.log('Saving form data:', formData);
        if (formFields.some(field => !field.fieldType || !field.name)) {
            alert('Each field must have a type and a name.');
            return;
        }
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Form data saved');
            } else {
                console.error('Failed to save form data');
            }
        } catch (error) {
            console.error('Error react:', error);
        }
    };

    const updateForm = async () => {
        if (!selectedForm || !selectedForm._id) {
            alert('No form selected for update.');
            return;
        }
    
        const url = `${serverUrl}/api/forms/update-form/${selectedForm._id}`; // Adjust the URL as needed
        const formData = {
            gridLayout: gridLayout,
            fields: formFields
        };
    
        console.log('Updating form data:', formData);
        if (formFields.some(field => !field.fieldType || !field.name)) {
            alert('Each field must have a type and a name.');
            return;
        }
    
        try {
            const response = await fetch(url, {
                method: 'PUT', // Use PUT method for update
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                console.log('Form data updated');
            } else {
                console.error('Failed to update form data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }; 

    const handleSelectForm = (form) => {
        setSelectedForm(form);
        setGridLayout(form.gridLayout);
        setFormFields(form.fields);
        setFormName(form.name);
        setShowHistoryModal(false);
    };


    const deleteForm = async (formId) => {
        // Logic to delete form and clear selectedForm
        if (formId === selectedForm._id) {
            clearForm();
        }
        if (!window.confirm("Are you sure you want to delete this form?")) {
            return;
        }
    
        try {
            const url = `${serverUrl}/api/forms/delete-form/${formId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                alert("Form deleted successfully.");
                clearForm();
            } else {
                alert("Failed to delete the form.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the form.");
        }
    };

    const clearForm = () => {
        setGridLayout({ rows: 3, cols: 3 });
        setFormFields([]);
        setSelectedForm(null);
    };

    const fieldSx = (field) => {
        // Example logic: different padding based on field type
        switch (field.type) {
            case 'text':
                return { padding: '8px' };
            case 'email':
                return { padding: '10px', border: '1px solid blue' };
            // Add more cases as needed
            default:
                return {};
        }
    };
    
    return (
        <Box className="form-builder">
            <Box className="toolbar" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <TextField
                    label="Form Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    sx={{ marginRight: 2, flexGrow: 1 }}
                />
                <TextField
                    label="Rows"
                    type="number"
                    name="rows"
                    value={gridLayout.rows}
                    onChange={handleGridLayoutChange}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Columns"
                    type="number"
                    name="cols"
                    value={gridLayout.cols}
                    onChange={handleGridLayoutChange}
                    sx={{ marginRight: 2 }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => setModalOpen(true)}
                    sx={{ marginRight: 2 }}
                >
                    Add Field
                </Button>
                <Button onClick={() => setShowHistoryModal(true)} sx={{ marginRight: 2 }}>
                    Open History
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => selectedForm && deleteForm(selectedForm._id)}
                    disabled={!selectedForm}
                >
                    Delete Form
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={saveOrUpdateForm}
                >
                    {selectedForm ? 'Update Form' : 'Save Form'}
                </Button>
                <Button onClick={clearForm}>Clear Form</Button>
            </Box>
            {isModalOpen && <Modal onSave={addField} onClose={() => setModalOpen(false)} />}
            <Box className="form-fields" sx={{ ...getGridStyle(), padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                {formFields.map((field, index) => (
                    <Box 
                        className="field-wrapper" 
                        key={index}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: 1, 
                            ...fieldSx(field)
                        }}
                    >
                        <FormField 
                            type={field.fieldType}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={field.value}
                            width={field.width} 
                            onChange={(e) => handleFieldChange(index, e)}
                            sx={{ flexGrow: 1, marginRight: 1 }}
                        />
                        <Tooltip title="Delete Field">
                            <IconButton 
                                aria-label="delete" 
                                onClick={() => deleteField(index)}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>
            <HistoryModal 
                open={showHistoryModal} 
                onClose={() => setShowHistoryModal(false)} 
                onSelectForm={handleSelectForm}
            />
        </Box>
    );
};

export default FormBuilder;
