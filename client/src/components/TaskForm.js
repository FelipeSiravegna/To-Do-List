import {
    Grid,
    Card,
    Typography,
    CardContent,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        const response = await fetch('http://localhost:3000/tasks', {
            method: "POST", 
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" }
        })

        // const data = await response.json()

        setLoading(false);

        navigate("/");
    };

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <Card sx={{ mt: 5, padding: "1rem" }}>
                    <Typography variant="5" textAlign="center">
                        Create task
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="filled"
                                label="Write your title"
                                sx={{ display: "block", margin: ".5rem 0" }}
                                name="title"
                                onChange={handleChange}
                            />

                            <TextField
                                variant="filled"
                                label="Write your description"
                                multiline
                                rows={4}
                                sx={{ display: "block", margin: ".5rem 0" }}
                                name="description"
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!task.title || !task.description}
                            >
                                {loading ? <CircularProgress color="inherit" size={24} /> : 'Create'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
