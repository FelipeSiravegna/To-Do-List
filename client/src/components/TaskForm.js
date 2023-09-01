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
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {

    const [task, setTask] = useState({
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (editing) {
            await fetch(`http://localhost:3000/tasks/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
        } else {
            await fetch("http://localhost:3000/tasks", {
                method: "POST",
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" },
            });
        }

        setLoading(false);

        navigate("/");
    };

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const getTask = async (id) => {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const data = await response.json();

        setTask({ title: data.title, description: data.description });
        setEditing(true);
    };

    useEffect(() => {
        if (params.id) {
            getTask(params.id);
        }
    }, [params.id]);

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
                        {editing ? "Edit your task" : "Create a new task"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="filled"
                                label="Write your title"
                                sx={{ display: "block", margin: ".5rem 0" }}
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                            />

                            <TextField
                                variant="filled"
                                label="Write your description"
                                multiline
                                rows={4}
                                sx={{ display: "block", margin: ".5rem 0" }}
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!task.title || !task.description}
                            >
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={24}
                                    />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
