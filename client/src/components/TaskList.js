import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        })

        setTasks(tasks.filter((task) => task.id !== id));
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <h1>Task list</h1>
            {tasks.map((task) => (
                <Card key={task.id}
                    style={{
                        marginBottom: "0.7rem",
                        backgroundColor: "#1e272e",
                    }}
                >
                    <CardContent
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
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
                                onClick={() => console.log("Editing")}
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
