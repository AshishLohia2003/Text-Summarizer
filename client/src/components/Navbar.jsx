import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Container from '@mui/material/Container';


function Navbar() {

    return (
        <AppBar position="static" sx={{ background: "#fff", borderRadius: "20px", position: "relative", top: "10px" }}>
            <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
                <Toolbar disableGutters>
                    {/* Logo */}
                    <SummarizeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "#000", fontSize: "2.25rem" }} />
                    <Typography
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: "1.25rem",
                        }}
                    >
                        Text Summarizer
                    </Typography>

                    {/* Mobile and Desktop Title */}
                    <SummarizeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: "#000", fontSize: "1.8rem" }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000',
                            textDecoration: 'none',
                        }}
                    >
                        Text Summarizer
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
