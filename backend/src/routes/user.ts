import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt  from 'bcryptjs';
const saltRounds = 10;
import { signupInput,signinInput } from "@piyushtanay/medium-common1";

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string
    }
}>();

async function hashPassword(password:string) {
  const res:string=await bcrypt.hash(password,saltRounds);
  return res;
}

async function comparePassword(password:string,hashPassword:string) {
   const res:boolean=await bcrypt.compare(password,hashPassword);
   return res;
}

userRouter.get('/users',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const users=await prisma.user.findMany({
      select:{
        id:true,
        username:true,
        password:true,
        name:true
      }
    });
    return c.json(users);
  }
  catch(e)
  {
    c.status(500);
    return c.text("Invalid");
  }
  
})

userRouter.put('/:id',async(c)=>{
  const body=await c.req.json();
  const authHeader=c.req.header("authorization")||"";
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
    const user = await verify(authHeader, c.env.JWT_SECRET);
    console.log(user.id);
    if (user) {
      const user1=await prisma.user.findFirst({
        where:{id:Number(user.id)}
      })
      console.log("user1 founded from id",user1.id);
      const hashedPassword = await hashPassword(body.password);
      const user2=await prisma.user.update({
        where:{
          id:user1.id
        },
        data:{
          username:body.username||user1.username,
          password:hashedPassword||user.password,
          name:body.name||user.name,
          about:body.about||user.about
        }
      })
      return c.json({message:"successfully updated profile of",user2})
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  }
  catch(e)
  {
    console.error(e);
    c.status(500);
    return c.json({message:"Failed to update profile"})
  }
})

userRouter.post('/signup', async (c) => {
    const body=await c.req.json();
    console.log(body);
    const result=signupInput.safeParse(body);
    if(!result.success){
      console.error(result.error);
      c.status(411);
      return c.json({
        message:"Inputs not correct",
        details: result.error.errors
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  try {
    const user=await prisma.user.create({
      data:{
        username:body.username,
        password:await hashPassword(body.password),
        name:body.name
      }
    })
    const jwt=await sign({
      id: user.id
    },c.env.JWT_SECRET);
    return c.text(jwt)
    
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Invalid")
  }
  })

  userRouter.post('/signin', async(c) => {
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({
        message:"Inputs not correct"
      })
    }
    // const temp=bcrypt.compare(body.password, hash)
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try{
      console.log("tried");
      const user=await prisma.user.findMany({
        where:{
          username:body.username
          // password:body.password
        }
      })
      console.log("userfound");
      if(user.length==0)
      {
        c.status(403);
        return c.text("Invalid")
      }
      console.log(user[0].password);
      for(let i=0;i<user.length;i++)
      {
         const check=await comparePassword(body.password,user[i].password)
         console.log(check);
         if(check)
          {
            console.log("finalised");
            const jwt=await sign({
              id:user[i].id
            },c.env.JWT_SECRET);
            return c.text(jwt)
          }
          if(i==user.length-1)
          return c.json("Password incorrect");
      }
    }
    catch(e){
      console.error(e);
      c.status(500);
      return c.json({ message: 'Internal Server Error1' });
    }
  })
  userRouter.get('/:id',async(c)=>{
    const id=c.req.param('id');
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const user=await prisma.user.findUnique({
        where:{
          id:Number(id)
        },
        select:{
          name:true,
          about:true
        }
      })
      return (
        c.json(user)
      ) 
    }
    catch(e)
    {
      c.status(411);
      return c.json({
        message:"Error while fetching user's name"
      })
    }
  })