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

  const username = req.body.username?.trim();
  const message = req.body.message?.trim();


  
  if (!username) {
    return res.status(400).send('Username must be entered');
  }
  
  if (!message) {
    return res.status(400).send("Can't send a blank message");
  }
    messages.push({ id: crypto.randomUUID() ,text: message, user: username, added: new Date() })
    res.redirect('/')
  

});

indexRouter.get('/message/:id', (req, res) => {
  const messageId = req.params.id
  
  const singleMessage = messages.find(msg => msg.id === messageId)
  
  if (!singleMessage) {
    res.status(404).send("Message Not Found")
  }
  
    res.render("messageDetails", { message: singleMessage });
})
