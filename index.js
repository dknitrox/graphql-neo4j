const neo4j = require('neo4j-driver').v1;

const driver=neo4j.driver("bolt://localhost",neo4j.auth.basic("neo4j","neo4j1"));

const session=driver.session();
const personName = 'kevin';
const resultPromise = session.run(
  'CREATE (a:Person {name: $name,from:$from,klout:$klout}) RETURN a',
  {name: personName,from:"españa",klout:50}
);

const resultMath=session.run(
	'MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies'
	)

resultMath
.then(result=>{
	console.log(result);
  const singleRecord = result.records[0];
  const node = singleRecord.get(0);
  const node2=singleRecord.get(1);
  console.log(singleRecord);
  console.log(node.properties);
  console.log(node2.properties);


})

driver.onCompleted=()=>{
	console.log("Driver conectado");
}
driver.onError=(error)=>{
	console.log("Error del driver",error)
}


