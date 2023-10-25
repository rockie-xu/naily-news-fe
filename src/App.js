import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    Paper,
    styled,
    Typography
} from "@mui/material";

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function buildNewsGrid (media) {
    console.log(media);
    return (
        <Grid item xs={4}>
            <List>
                <h3>{media.name}</h3>
                {media.news.map((newsItem) => (
                    <div key={newsItem.id}>
                        <ListItem style={{padding: '0px'}}>
                            <p style={{fontSize: '12px'}}>
                                <Link href={newsItem.url} target="_blank" rel="noopener noreferrer">
                                    {truncateText(newsItem.title, 42)}
                                </Link>
                            </p>
                        </ListItem>
                    </div>
                ))}
            </List>
        </Grid>
    );
}

function App() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/news/tech') // Replace with the actual backend API URL
            .then((response) => {
                setNewsData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching news data:', error);
            });
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h3" align="center" gutterBottom>
                Tech News
            </Typography>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {newsData.map((media) => (buildNewsGrid(media)))}
                </Grid>
            </Box>
            <Divider/>
        </Container>
    );
}

export default App;