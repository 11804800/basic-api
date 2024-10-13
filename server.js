import express from "express";

const app = new express();

app.listen(3000, () => {
  console.log("Express is running at 3000");
});

//express inbuilt middleware for parsing the payload into json
app.use(express.json());

const UserRouter = express.Router();

//middleware to console all the request made on the api with type url and response code
function Logger(req, res, next) {
  console.log(res.statusCode + "  URL: " + req.url + " " + req.method);
  next();
}

//middleware to validate the user data;
function Validate(req, res, next) {
  if (!req.body.firstName || !req.body.lastName || !req.body.hobby) {
    return res.status(400).json("Invalid input");
  } else {
    next();
  }
}

//initializing the user data array with dummy data
var users = [
  {
    id: "1",
    firstName: "Shin",
    lastName: "Chan",
    hobby: "Playing Football",
  },
  {
    id: "2",
    firstName: "Salman",
    lastName: "Khan",
    hobby: "Acting",
  },
];

//getting all the data
UserRouter.get("/", Logger, (req, res) => {
  res.status(200).json(users);
});

//getting the specfic user data
UserRouter.get("/:id", Logger, (req, res) => {
  //finding the user with given id
  const user = users.find((item) => item?.id == req.params.id);
  if (!user) {
    return res
      .status(404)
      .send("User Not Found With Given Id " + req.params.id);
  }

  res.status(200).json(user);
});

//Posting the data to the Users Data
UserRouter.post("/", Logger, Validate, (req, res) => {
  //decidig the random number
  let ID = Math.floor(Math.random() * 10);
  const user = {
    id: ID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    hobby: req.body.hobby,
  };

  users.push(user);
  res.status(201).json({ message: "User Created!", user: user });
});

//Put Operation  without the user id
UserRouter.put("/", Logger, (req, res) => {
  res.send("You Cannot Perform Put Operation Without the user id");
});

//Post Operation that user cannot post operation id
UserRouter.post("/:id", Logger, (req, res) => {
  res.send("You Cannot Post Operation");
});

//updating the specific user data
UserRouter.put("/:id", Logger, Validate, (req, res) => {
  //finding the user
  const user = users.find((item) => item?.id == req.params.id);
  if (!user) {
    return res
      .status(404)
      .send("User Not Found With Given Id " + req.params.id);
  }

  const keys=Object.keys(req.body);

  keys.forEach((key)=>{
    user[key]=req.body[key]
  });

  res.status(200).json(user);
});

//deleting all the users data from Users data
UserRouter.delete("/", Logger, (req, res) => {
  //setting the array to empty array
  users = [];
  res.status(200).json("All The Users Data Deleted");
});

//deleting the Specific user data
UserRouter.delete("/:id", Logger, (req, res) => {
  const index = users.findIndex((item) => item?.id == req.params.id);
  if (index >= 0) {
    //array inbuilt method for deleting the data first argument is index and second is how many elements from that index;
    users.splice(index, 1);
    res.status(200).json(`User With Id ${req.params.id} is Deleted`);
  } else {
    //if not found then it will return the error
    return res
      .status(404)
      .send("User Not Found With Given Id " + req.params.id);
  }
});

//calling the route users
app.use("/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the User Api");
});
