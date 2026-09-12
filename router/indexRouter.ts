import { Router } from "express";
import { messages } from "../db";


export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render("index", { messages: messages });
})


indexRouter.get('/new', (req, res) => {
    res.render('form')
})

indexRouter.post("/new", (req, res) => {
  const { username, message } = req.body;

  
  if (!username) {
    return res.status(400).send('Username must be entered');
  }
  else if (!message) {
    return res.status(400).send("Can't send a blank message");
  }
  else {
    messages.push({ id: crypto.randomUUID() ,text: message, user: username, added: new Date() })
    console.log(`"message": ${message}`)
    console.log(`"user": ${username}`);

    res.redirect('/')
  }

});

indexRouter.get('/message/:id', (req, res) => {
  const messageId = req.params.id
  
  const singleMessage = messages.find(msg => msg.id === messageId)
  
  if (!singleMessage) {
    res.status(404).send("Message Not Found")
  }
  
    res.render("messageDetails", { message: singleMessage });
})
