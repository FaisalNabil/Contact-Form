import React from 'react';
import TextField from '@mui/material/TextField';

const FormField = ({ fieldType, placeholder, name, value, onChange, width }) => {
    return (
        <TextField
            type={fieldType}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            margin="normal"
            style={{ width: width }}  // Apply the width
        />
    );
};

export default FormField;
