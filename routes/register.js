const Joi = require('joi');

const schemaStudent = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    career: Joi.string().valid('LISC', 'LIE', 'LIDIA', 'LME', 'LGE', 'LIMT').required()
});

//event: id, title, date, hour, place, speaker name, and list of registered students
const schemaEvent = Joi.object({
    title: Joi.string().min(3).required(),
    date: Joi.string().required(),
    hour: Joi.string().required(),
    place: Joi.string().min(3).required(),
    speaker_name: Joi.string().min(3).required()
});

class Student{
    constructor(id, name, email, career){
        this.id = id;
        this.name = name;
        this.email = email;
        this.career = career;
    };

    read(){
        return [this.id, this.name, this.email, this.career];
    }

    update(name, email, career){
        this.name = name;
        this.email = email;
        this.career = career;
    }
}

const students = {
    students:[],

    getEmails:function(){
        let emails = [];
        for(let i = 0; i<this.students.length; i++){
            emails.push(this.students[i].read()[2]);
        }
        return emails;
    },

    getIDs:function(){
        let ids = [];
        for(let i = 0; i<this.students.length; i++){
            ids.push(this.students[i].read()[0]);
        }
        return ids;
    },

    checkID:function(id){
        id = +id
        let ids = this.getIDs();
        if(ids.indexOf(id) == -1)
            return [false, -1];

        return [true, ids.indexOf(id)];
    },

    create:function(name, email, career){
        //Calcular ID
        let id;
        try {
            id = this.students[this.students.length - 1].read()[0] + 1;
        } catch (error) {
            id = 0;
        }
        //Email Existente 
        let emails = this.getEmails();        
        if(emails.length > 0 && emails.indexOf(email) != -1) return false;
        //Agregar
        this.students.push(new Student(id, name, email, career));
        return true;
    },

    read:function(id){
        //Verificar ID
        let [check, index] = this.checkID(id);
        if(check)
            return this.students[index].read();
        return false;
    },

    update:function(id, name, email, career){
        //Verificar ID
        let [check, index] = this.checkID(id);
        //Email Existente 
        let emails = this.getEmails();        
        if(emails.indexOf(email) != -1 && emails.indexOf(email) != index) return false;
        //Actualizar 
        if(check){
            this.students[index].update(name, email, career);
            return true;
        }
        return false; 
    },

    delete:function(id){
        //Verificar ID
        let [check, index] = this.checkID(id);
        //Eliminar
        if(check){
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }

}

//event: id, title, date, hour, place, speaker name, and list of registered students
class Event{
    constructor(id, title, date, hour, place, speaker_name){
        this.id = id;
        this.title = title;
        this.date = date;
        this.hour = hour;
        this.place = place;
        this.speaker_name = speaker_name;
        this.students = [];
    };

    read(){
        return [this.id, this.title, this.date, this.hour, this.place, this.speaker_name, this.students];
    }

    update(title, date, hour, place, speaker_name){
        this.title = title;
        this.date = date;
        this.hour = hour;
        this.place = place;
        this.speaker_name = speaker_name;
    }

    addStudent(id_student){
        //Comprobar Alumno No Agregado 
        if(this.students.indexOf(id_student) == -1){
            this.students.push(id_student);
            return true;
        }else{
            return false;
        }
    }

    deleteStudent(id_student){
        //Comprobar Alumno Agregado
        if(this.students.indexOf(id_student != -1)){
            this.students.splice(this.students.indexOf(id_student), 1);
            return true;
        }else{
            return false;
        }
    }
}

const events = {
    events:[],

    getDHP:function(){ //Day, Hour, Place
        let DHP = [];
        for(let i = 0; i<this.events.length; i++){
            DHP.push(this.events[i].read().slice(2,5).toString());
        }
        return DHP;
    },

    getIDs:function(){
        let ids = [];
        for(let i = 0; i<this.events.length; i++){
            ids.push(this.events[i].read()[0]);
        }
        return ids;
    },

    checkID:function(id){
        id = +id
        let ids = this.getIDs();
        if(ids.indexOf(id) == -1)
            return [false, -1];

        return [true, ids.indexOf(id)];
    },

    create:function(title, date, hour, place, speaker_name){
        //Calcular ID
        let id;
        try {
            id = this.events[this.events.length - 1].read()[0] + 1;
        } catch (error) {
            id = 0;
        }
        //Verificar Date, Hour y Place
        let DHP = this.getDHP();        
        if(DHP.length > 0 && DHP.indexOf([date,hour,place].toString()) != -1) return false;
        //Agregar
        this.events.push(new Event(id, title, date, hour, place, speaker_name));
        return true;
    },

    read:function(id){
        let [check, index] = this.checkID(id);
        if(check)
            return this.events[index].read();
        return false;
    },

    update:function(id, title, date, hour, place, speaker_name){
        //Verificar ID
        let [check, index] = this.checkID(id);
        //Verificar Date, Hour y Place
        let DHP = this.getDHP();  
        if(DHP.indexOf([date,hour,place].toString()) != -1 && DHP.indexOf([date,hour,place].toString()) != index) return false;
        //Actualizar 
        if(check){
            this.events[index].update(title, date, hour, place, speaker_name);
            return true;
        }
        return false;
    },

    delete:function(id){
        //Verificar ID
        let [check, index] = this.checkID(id);
        //Eliminar
        if(check){
            this.events.splice(index,1);
            return true;
        }
        return false;
    }
}

module.exports = {
    students,
    schemaStudent,
    events,
    schemaEvent
}