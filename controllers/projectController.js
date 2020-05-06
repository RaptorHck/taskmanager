const Project = require('../models/Project');
const {validationResult} = require('express-validator');

exports.createProject = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty() ){
        return res.status(401).json({errors: errors.array()});
    }

    try{
        
        //Crear a new Project
        const project = new Project(req.body);

        //Guardar el creator via jwt
        project.creator = req.user.id;

        project.save();
        res.json(project);


    }catch(error) {
        console.log(error)
        res.status(500).send('There are error');
    }

}

//Obtener todos los projects del usuario actual
exports.obteinProjects = async (req, res) => {

    try{
        const projects = await Project.find({creator: req.user.id}).sort({dateCreate: -1});
        res.json({projects});
    }catch(error){
        console.log(error);
        res.status(500).send('There are error');
    }
}

//Actualizar projects
exports.updateProjects = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty() ){
        return res.status(401).json({errors: errors.array()});
    }

    //Extraer la informacion del projecto
    const{name_project} = req.body;

    const newProject = {};

    if(name_project){
        newProject.name_project = name_project
    }

    try{
        //Revisar ID
        let project = await Project.findById(req.params.id);

        //Si existe el projecto
        if(!project){
            return res.status(404).json({msg: 'Projects not foud'});
        }

        //Verificar el creator del project
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authotized'})
        }

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, 
            { $set: newProject },
            { new: true});

        res.json(project);    

        // Actualizar 
    }catch(error){
        console.log(error);
        res.status(500).send('There are error');
    }
} 


exports.deleteProject = async (req, res) => {
    
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty() ){
            return res.status(401).json({errors: errors.array()});
        }

        //Extraer la informacion del projecto
        const{name_project} = req.body;

        const newProject = {};

        if(name_project){
            newProject.name_project = name_project
        }

        //Eliminar project

        await Project.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Project Deleted'});

    }catch(error){
        console.log(error);
        res.status(404).send('There are arrors');
    }

}