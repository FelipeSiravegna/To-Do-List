import { useEffect, useState } from "react";
import {Card, CardContent, Typography} from '@mui/material'

export default function TaskList() {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const response = await fetch('http://localhost:3000/tasks')
        const data = await response.json()
        setTasks(data);
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <h1>Task list</h1>
            {
                tasks.map((task) => (
                    <Card>
                        <CardContent>
                            <Typography>{task.title}</Typography>
                            <Typography>{task.description}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
}
