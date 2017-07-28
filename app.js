const express=require("express");
const app=express();
const graphql=require('graphql');
const got=graphql.GraphQLObjectType;
const gs=graphql.GraphQLSchema;
const bodyParser=require("body-parser");
const mongoose=require('mongoose');

mongoose.connect('localhost:27017/neo4j');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	nombre:{type:String,default:"Juanito"},
	edad:{type:Number},
	date:{type:Date,default:Date.now()}
});


const User=mongoose.model('user',userSchema);
function getAllUsers(){
	return new Promise((resolve,reject)=>{
	User.find({},(err,us)=>{
		if(err)reject(err);
		else{
			console.log("usuarios",us);
			resolve(us);
		}
	})
});
}

function userById(root,args){
return new Promise((resolve,reject)=>{
	const _id=mongoose.Types.ObjectId(args._id);
	console.log("id",_id);
	User.findById(_id,(err,us)=>{
		if(err)reject(err);
		else{
			console.log("user encontrado",us);
			resolve(us);
		}
	});
})
}

const userType=new got({
	name:'User',
	description:"Un usuario",
	fields:()=>({
		_id:{
			type:new graphql.GraphQLNonNull(graphql.GraphQLID),
		},
		nombre:{
			type:graphql.GraphQLString
		},
		edad:{
			type:graphql.GraphQLInt
		},
		date:{
			type:graphql.GraphQLString
		}
	})
});

const userQuery={
		users:{
				type:new graphql.GraphQLList(userType),
				resolve:getAllUsers
			},
			user:{
				type:userType,
				args:{
					_id:{
						type:graphql.GraphQLString
					}		
				},
				resolve:userById
			}

}
const userMutation={
	addUser:{
		type:userType,
		args:{
			nombre:{
				type:graphql.GraphQLString
			},
			edad:{
				type:new graphql.GraphQLNonNull(graphql.GraphQLInt)
			}
		},
		resolve:(root,args)=>{
			console.log("user a crear",args);
			return new Promise((resolve,reject)=>{
				User.create(args,(err,res)=>{
					err?reject(err):resolve(res);
				})
			})
		}
	}
}
const Query=Object.assign({},userQuery);
const Mutation=Object.assign({},userMutation);
const RootQuery=new got({
	name:"Query",
	fields:Query
		
})

const RootMutation=new got({
	name:"Mutation",
	fields:Mutation
})
const schema=new gs({
	query:RootQuery,
	mutation:RootMutation
})

app.use(bodyParser.json());

var { graphiqlExpress }=require('graphql-server-express');
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.post('/graphql',(req,res)=>{
	console.log("req.body",req.body);
	graphql.graphql(schema,req.body.query)
	.then(function(data){
		console.log("data reciida");
		console.log("data==",data);

		res.status(200).send(data);
	})
	.catch(err=>{
		console.log("errr",err);
	})
})
app.listen(8001);