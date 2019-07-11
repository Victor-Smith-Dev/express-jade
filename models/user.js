var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos", { useNewUrlParser: true });
/**
* creacion del schema para el documento de User
*/
var email_match = [/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingresa un email valido"];
/**
*
*/
var user_schema = new Schema({
	name : String,
	username : {
		type : String,
		required : true,
		maxlength : [
			50 , "Username muy largo"
		]
	},
	password : {
		type: String,
		minlength : [
			8 , "El password es muy corto"
		]/*
		validate : {
			validator : ( pass ) => {
				return this.password_confirmation == pass;
			},
			message : "Las contrasennas no coinciden"
		}*/
	},
	age : {
		type : Number,
		min : [
			5 , "La edad no puede ser menor que 5"
		],
		max : [
			100 , "La edad no puede ser mayores que 100"
		]
	},
	email : {
		type:String,
		required:"El correo es obligatorio",
		match : email_match
	},
	date_of_birth : Date,
	sex : {
		type : String,
		enum : {
			values : [ "M", "F" ],
			message : "Opcion no valida"
		}
	}
});

user_schema.virtual('password_confirmation')
.get( () => {
	return this.p_c;
})
.set( ( password ) => {
	this.p_c = password;
})
/**
* creacion del modelo
*/
var User = mongoose.model("User", user_schema);

module.exports = User;
