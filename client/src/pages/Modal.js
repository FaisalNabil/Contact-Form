import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ onSave, onClose }) => {
    const [fieldType, setFieldType] = useState('text');
    const [fieldName, setFieldName] = useState('');
    const [fieldWidth, setFieldWidth] = useState('100%');
    const [placeholder, setPlaceholder] = useState('');
    const [rowStart, setRowStart] = useState(1);
    const [colStart, setColStart] = useState(1);
    const [rowSpan, setRowSpan] = useState(1);
    const [colSpan, setColSpan] = useState(1);

    const handleSave = () => {
        onSave({
            fieldType: fieldType, 
            name: fieldName, 
            placeholder: placeholder, 
            width: fieldWidth, 
            value: '', 
            rowStart, 
            colStart, 
            rowSpan, 
            colSpan
        });
        onClose();
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>
                Add New Field
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Select
                    value={fieldType}
                    onChange={(e) => setFieldType(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    {/* Add more field types if needed */}
                </Select> 
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Field Name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Field Width"
                    value={fieldWidth}
                    onChange={(e) => setFieldWidth(e.target.value)}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Placeholder"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Row Start"
                    type="number"
                    value={rowStart}
                    onChange={(e) => setRowStart(Number(e.target.value))}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Column Start"
                    type="number"
                    value={colStart}
                    onChange={(e) => setColStart(Number(e.target.value))}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Row Span"
                    type="number"
                    value={rowSpan}
                    onChange={(e) => setRowSpan(Number(e.target.value))}
                />
                <TextField 
                    margin="normal"
                    fullWidth
                    label="Column Span"
                    type="number"
                    value={colSpan}
                    onChange={(e) => setColSpan(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Add Field
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
