type Task = {
    id: number,
    name: string,
    deadline: string,
    description: string
}

type User = {
    username: string,
    password: string,
    tasks: Task[]
}
