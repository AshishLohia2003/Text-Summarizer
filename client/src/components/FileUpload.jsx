import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { UploadFile } from '@mui/icons-material';

function FileUpload({ setSummary }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file!');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('http://localhost:5000/api/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSummary(response.data.summary);
        } catch (error) {
            // console.error('Error uploading file:', error);
            alert('An error occurred while processing the PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            p={1}
            borderRadius="20px"
            boxShadow={"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"}
            sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '50%', md: '100%' } }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="10px"
        >
            <Typography variant="h5" fontFamily="monospace">
                Upload PDF
            </Typography>
            <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button
                    variant="contained"
                    component="span"
                    sx={{
                        width: "160px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "20px",
                        bgcolor: "#000",
                        fontFamily: "monospace",
                    }}
                >
                    <UploadFile />
                    {file ? (
                        <Typography
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "160px",
                            }}
                        >
                            {file.name}
                        </Typography>
                    ) : (
                        "Choose File"
                    )}
                </Button>

            </label>
            <Button
                variant="contained"
                sx={{
                    borderRadius: "20px",
                    bgcolor: "#000",
                    fontFamily: "monospace"
                }}
                onClick={handleSubmit}
                disabled={!file || loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Summarize'}
            </Button>
        </Box>
    );
}

export default FileUpload;