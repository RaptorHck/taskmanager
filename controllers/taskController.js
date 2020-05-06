const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');

//Crea una nueva tarea

exports.createTask = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty() ){
        return res.status(401).json({errors: errors.array()});
    }


    //Extraer el project y comprobar si existe
    try{

        const {projectId} = req.body; 
        
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //Revisar si project actual pertenece al usaurio autenticado
        //Verificar el creator del project
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authotized'})
        }

        //Crear task
        const task = new Task(req.body);
        await task.save();
        res.json({task});



    }catch(error){
        res.status(500).send('There are error')
    }



}

exports.obteinTasks = async(req, res) => {


    try{
        
        const {projectId} = req.query; 
        
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //Revisar si project actual pertenece al usaurio autenticado
        //Verificar el creator del project
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authotized'})
        }

        //obtien task por projectsz
        const tasks = await Task.find({projectId}).sort({createTask: -1});
        res.json({tasks});


    }catch(error){
        console.log(error);
        res.status(500).send('There are error');
    }

}

exports.updateTask = async (req, res) => {
    try{
        //Extraer el projecto y comprobar si existe
        const {projectId, name_task, status} = req.body;

        //Si la tarea existe o no
        let task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({msg: "Task not found"});
        }
        
        const project = await Project.findById(projectId);
    
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorized'});
        }


        //Crear a nuevo objeto con la nuevea informacion
        const newTask = {};

        newTask.name_task = name_task
        newTask.status = status

        //Guardad task

        task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            newTask,
            {new: true}
        );
        
        res.json({task});


    }catch(error){
        res.status(500).send('There are error')
    }
}

exports.deleteTask = async (req, res) => {

    try{
        //Extraer el projecto y comprobar si existe
        const {projectId} = req.query;

        //Si la tarea existe o no
        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg: "Task not found"});
        }
        
        const project = await Project.findById(projectId);
    
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorized'});
        }

        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Task deleted'});
       


    }catch(error){
        res.status(500).send('There are error')
    }
}