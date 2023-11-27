import React, { useState, useEffect } from 'react';
import { Dialog, List, ListItem, ListItemText, CircularProgress, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const HistoryModal = ({ open, onClose, onSelectForm }) => {
    const [savedForms, setSavedForms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSavedForms = async () => {
            setLoading(true);
            try {
                const serverUrl = process.env.REACT_APP_SERVER_URL;
                const response = await fetch(`${serverUrl}/api/forms/get-form`);
                if (response.ok) {
                    const forms = await response.json();
                    console.log(forms);
                    setSavedForms(forms);
                } else {
                    console.error('Failed to fetch saved forms');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedForms();
    }, []);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const deleteForm = async (formId) => {
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
                // Update local state to remove the deleted form
                setSavedForms(savedForms.filter(form => form._id !== formId));
            } else {
                alert("Failed to delete the form.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the form.");
        }
    };
    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Select a Form
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <div>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {savedForms.map(form => (
                            <ListItem key={form._id} secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteForm(form._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText primary={form.name || form._id} onClick={() => onSelectForm(form)} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        </Dialog>
    );
};

export default HistoryModal;
