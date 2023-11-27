import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';

const History = ({ onSelectForm }) => {
    const [savedForms, setSavedForms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSavedForms = async () => {
            setLoading(true);
            try {
                const serverUrl = process.env.REACT_APP_SERVER_URL;
    
                const response = await fetch(`${serverUrl}/api/forms/get-forms`);
                if (response.ok) {
                    const forms = await response.json();
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

    const navigate = useNavigate();

    const handleSelectForm = (form) => {
        navigate('/', { state: { selectedForm: form } });
    };

    return (
        <div>
            <Typography variant="h6" style={{ padding: '20px 0' }}>
                Saved Forms History
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {savedForms.map(form => (
                         <ListItem button key={form._id} onClick={() => handleSelectForm(form)}>
                            <ListItemText primary={form.name || 'Unnamed Form'} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default History;
