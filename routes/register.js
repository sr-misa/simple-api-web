const Joi = require('joi');

const schemaStudent = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    career: Joi.string().valid('LISC', 'LIE', 'LIDIA', 'LME', 'LGE', 'LIMT').required()
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

module.exports = {
    students,
    schemaStudent
}