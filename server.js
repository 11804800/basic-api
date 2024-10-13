import express from "express";

const app = new express();
app.listen(3000, () => {
  console.log("Express is running at 3000");
});

//to define that in what format we are requesting and responsing data
//any request we will make it will now parse it to json then it perform http requests
//this is actually a middleware
app.use(express.json());


//for returning the method and status of request of the http method
app.use((req,res,next)=>{
  console.log(res.statusCode+""+res?.path+"  "+req.method);
  next();
});

const users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
];

app.get("/", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
