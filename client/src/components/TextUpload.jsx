import { Box, Button, Typography, TextareaAutosize, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'

const TextUpload = ({ setSummary }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = async () => {
        if(!text){
            alert("Write the text!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/upload-text', { text });
            const summary = response.data.summary;
            setSummary(summary);
        } catch (error) {
            // console.error('Error sending text to the backend:', error);
            alert("Error sending text to the backend");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            width="50%"
            p={1}
            borderRadius="20px"
            boxShadow={"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"}
            sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '50%', md: '100%' }, mt: { xs: '10px', md: '0' } }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="10px"
        >
            <Typography variant="h5" fontFamily="monospace">
                Text Summarizer
            </Typography>

            {/* Text Input Field */}
            <TextareaAutosize
                placeholder='Write down the text here...'
                value={text}
                onChange={handleTextChange}
                style={{
                    width: "80%",
                    fontFamily: 'IBM Plex Sans',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    height: "150px",
                    resize: "vertical"
                }}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    borderRadius: "20px",
                    bgcolor: "#000",
                    color: "#fff",
                    fontFamily: "monospace",
                    '&:hover': {
                        bgcolor: "#333"
                    }
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Summarize'}
            </Button>
        </Box>
    )
}

export default TextUpload
