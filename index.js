const express = require("express");


const server = express();
server.use(express.json());

const projects = [{}];
let cont = 1;

server.use((req, res, next) => {

    console.log(cont++);
    next();
})

function projectExists(req, res, next){
    const { id } = req.params;

    if(!projects[id]){
        return res.status(400).json({erro: "o projeto não existe"});
    }

    return next();
}


server.post("/projects", (req, res) => {
    const { project } = req.body;

    projects.push({id:projects.length, project});

    return res.json(projects);

})

server.post("/projects/:id/tarefas", projectExists, (req, res) => {
    const { id } = req.params;
    const { tarefas } = req.body;

    projects[id].tarefas = tarefas.split(",");

    return res.json(projects);
})

server.put("/projects/:id", projectExists, (req, res) => {
const { id } = req.params;
const { project } = req.body;

projects[id].project = project;

return res.json(projects);

})

server.get("/projects", (req, res) => (
    res.json(projects)
))

server.get("/projects/:id", projectExists, (req, res) => {
    const { id } = req.params;

    return res.json(projects[id]);
})

server.delete("/projects/:id", projectExists,(req, res) => {
    const { id } = req.params;

    projects.splice(id, 1);
    
    return res.json(projects);
})

server.listen(2300);