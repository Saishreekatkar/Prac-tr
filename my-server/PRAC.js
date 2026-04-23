const express =require('express');

const app=express();

app.use(express.json());

const PORT=3000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT :${PORT}` );
  
});

let users = [
    {id:1, name:"grace", Task:"wash dishes"},
    {id:2, name:"leon", Task:"cook"},
];

app.get('/users', (req,res)=> {
    res.json(users);
});


app.get('/users/:id',(req,res)=> {
    const user =users.find(u=>u.id===parseInt(req.params.id));
    if (!user){
        res.json("nobody that name");
    }
    res.json(user);
});

app.post('/users',(req,res)=> {
    const {name, Task}=req.body;
    const newuser={
        id: users.length +1,
        name,
        Task
    }
    users.push(newuser);
    res.json(users);
});

app.put('/users/:id',(req,res)=> {
    const index= users.findIndex(u=>u.id === parseInt(req.params.id));
    if (index===-1){
        return res.status(401).json("user not found ");

    }
    const {name,Task}=req.body;
    users[index]={id:parseInt(req.params.id),name,Task};
    res.json(users);

})

app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
    if (req.body.name) user.name=req.body.name;


 res.json(user);
});


app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted" });
});