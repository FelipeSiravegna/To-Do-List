import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    style={{
                        marginTop: "1rem",
                        backgroundColor: "#1e272e",
                    }}
                >
                    <CardContent
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "1rem"
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                            }}
                        >
                            <Typography>{task.title}</Typography>
                            <Typography>{task.description}</Typography>
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() =>
                                    navigate(`/tasks/${task.id}/edit`)
                                }
                            >
                                Edit
                            </Button>

                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => handleDelete(task.id)}
                                style={{
                                    marginLeft: "0.5rem",
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
