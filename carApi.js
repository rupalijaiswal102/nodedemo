let express = require("express"); 
//const { studentsData } = require("./studentData");
let app=express();
app.use(express.json()); 
app.use(function (req, res, next) 
{ res.header("Access-Control-Allow-Origin", "*"); 
res.header(
  "Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
       );
    res.header(
     "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    next();
    
    });
    
var port=process.env.PORT||2410;

app.listen(port, () => console.log(`Listening on port ${port}!`));

let {carsData}=require("./cardata.js")
let {carMasterData}=require("./cardata.js")

app.get("/cars",function(req,res){
  let fuel=req.query.fuel;
  let type=req.query.type;
  let maxprice=req.query.maxprice;
  let minprice=req.query.minprice;
  let sort=req.query.sort;
  let arr1=carsData
  let arr2=carMasterData
  //let arr3=arr1.filter((c1)=>arr2.find((a1)=>a1.model===c1.model))
  if (fuel){
    let a=arr2.filter((a1)=>a1.fuel==fuel)
     arr1=arr1.filter((st)=> a.find((c1)=> c1.model===st.model));
     console.log(a)
  }
  if (type){
    let a=arr2.filter((a1)=>a1.type===type)
     arr1=arr1.filter((st)=> a.find((c1)=> c1.model===st.model));
     console.log(a)
  }
  if (maxprice){
    let maxArr=maxprice.split(",")
     arr1=arr1.filter((st)=> maxArr.find((c1)=> 
     c1>st.price));
  }
  if (minprice){
    let minArr=minprice.split(",")
     arr1=arr1.filter((st)=> minArr.find((c1)=> 
     c1<st.price));
  }
  if(sort==="kms"){
    //arr1.sort((st1,st2)=>st1.kms.localeCompare(st2.kms));
    arr1.sort((p1,p2)=>(p1.kms)-(+p2.kms))
  }
  if(sort==="price"){
 arr1.sort((p1,p2)=>(p1.price)-(+p2.price))
  }
  if(sort==="year"){
  arr1.sort((p1,p2)=>(p1.year)-(+p2.year))
  }
 // console.log(carMasterData)
    res.send(arr1,arr2)

})

app.get("/carsMaster",function(req,res){
  res.send(carMasterData)
})


app.get('/cars/:id', function (w, S) {
  let d = w.params.id 
 let q = carsData.find(e => e.id === d);
  if (q)
      S.send(q);
  else
      S.status(404).send('No\x20student\x20found');
  })

app.post('/cars', function(req,res){
    let body=req.body
    //console.log(body)
    /* let maxid=customersData.reduce(
     (acc,curr)=>(curr.id>=acc?curr.id:acc),
     0  
     );
     let newid=maxid;
     let newCustomer={ id:newid,...body};*/
     carsData.push(body);
     res.send(body)
    
  })

  app.put('/cars/:id', function(req,res){
    let q=req.params.id;
    let body=req.body;
    let updateCar={id:q, ...body};
    
    let index=carsData.findIndex((c1) => c1.id===q);
   // console.log(index,updateCar,q)
    if(index>=0){
      carsData[index]=updateCar;
       res.send(updateCar);
    }
    else res.status(404).send("No Car found")  
  
  })
  app.delete("/cars/:id", function(req,res){
    let id=req.params.id;
    let index=carsData.findIndex((c1)=>c1.id===id);
    if (index >= 0) {
    let deleteCar =carsData.splice(index,1)
    res.send(deleteCar);
    }
    else{
      res.send("not found");
    }
  })