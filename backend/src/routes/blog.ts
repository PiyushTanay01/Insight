import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@piyushtanay/medium-common1";
import { string, tuple } from "zod";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in"
    });
  }
});


blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      description:body.description,
      content: body.content,
      authorId: Number(authorId)
    }
  });
  return c.json({
    id: blog.id
  });
});

  blogRouter.put('/', async(c) => {
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const blog=await prisma.blog.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            description:body.description,
            content:body.content
        }
    })
    return c.json({
        id:blog.id
    })
  })
  
  blogRouter.get('/bookmarks', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          blog: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              createdAt: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return c.json({ bookmarks });
    } catch (e) {
      c.status(500);
      return c.json({ message: 'Error fetching bookmarks', error: e });
    }
  }); 

  blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
  const blogs=await prisma.blog.findMany({
    select:{
        description:true,
        title:true,
        id:true,
        createdAt:true,
        author:{
            select:{
                name:true,
            }
        }
    }
  });
    return c.json({
        blogs
    })
  }
  catch(e){
    c.status(500)
     return c.json({ message: "Error fetching blogs",e });
  }
  })

  blogRouter.get('/myblogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        try {
                 const userId = c.get("userId");
                  const blogs = await prisma.blog.findMany({
                  where: { authorId: Number(userId) },
                  select: {
                    content:true,
                    description:true,
                    title:true,
                    id:true,
                    createdAt:true,
                    author:{
                      select:{
                         name:true,
                      }
                    }
                    }
                });
                return c.json({blogs});
              } 
              catch (e) {
                c.status(500)
                return c.json({ message: "Error fetching blogs",e });
        }
      });
  
//   blogRouter.put('/like',async(c)=>{
//     const body=await c.req.json();
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())
//     try{
//       const userId = c.get("userId");
//       // const user=await prisma.user.findFirst({
//       // where:{id:Number(userId)},
//       // select:{
//       //   name:true,
//       //  username: true,
//       //  password:true
//       // }})
//       // if(!user){
//       //   c.status(500);
//       //   return c.json({message:"User not found"});
//       // }
    
//       const post = await prisma.likedBlog.create({
//         data: {
//             userId: Number(userId),
//             blogId: body.id
//         }
//       });
//       return c.json(post);
//     }
  
//    catch (err) {
//     c.status(500);
//           return c.json({ message: 'Internal Server Error',err });
//   }
// })
//create:[{id:Number(userId),name:user.name,username:user.username,password:user.password}]

  blogRouter.get('/search', async (c) => {
        const query = c.req.query('query');
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
      
        if (!query) {
          return c.json({ error: 'Query parameter is required' }, 400);
        }
      
        try {
          const blogs = await prisma.blog.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            select: {
              id: true,
              title: true,
              content: true,
              description: true,
              createdAt:true,
              author: {
                  select: {
                      name: true
                  }
              }
            }
          });
          return c.json({blogs});
        } catch (error) {
          c.status(500);
          return c.json({ message: 'Internal Server Error',error });
        }
      });

       
      
  blogRouter.get('/:id', async(c) => {
    const id= c.req.param("id");
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try{
        const blog=await prisma.blog.findFirst({
            where:{
                id:Number(id)
            },
            select: {
                id: true,
                authorId: true,
                title: true,
                content: true,
                description: true,
                createdAt:true,
                author: {
                    select: {
                        name: true,
                        about:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }
    catch(e)
    {
        c.status(500);
        return c.json({
            message:"Error while fetching blog posts",e
        });
    }
  })

  blogRouter.delete('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const userId = c.get("userId");
      console.log("userId: ",userId);
      const blog = await prisma.blog.findFirst({
        where: {
          id: Number(id)
        },
        select: {
          authorId: true
        }
      });

      if (!blog) {
        c.status(404);
        return c.json({ message: 'Blog not found' });
      }
      else{
        console.log("blog_authorId: ",blog.authorId);
      }

      if (blog.authorId !== Number(userId)) {
        c.status(403);
        return c.json({ message: 'Forbidden: You are not authorized to delete this blog' });
      }

      const bookmark=await prisma.bookmark.findFirst({
        where:{
          blogId:Number(id)
        }
      })

      if(bookmark)
        {
          await prisma.bookmark.delete({
            where:{
              id:bookmark.id
            }
          })
        }
  
      // Delete the blog
      await prisma.blog.delete({
        where: {
          id: Number(id)
        }
      });
  
      return c.json({ message: 'Blog deleted successfully' });
    } catch (e) {
      c.status(500);
      return c.json({
        message: "Error deleting blog",
        error: e
      });
    }
  });
  
  


  blogRouter.delete('/',async(c)=>{
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        await prisma.blog.deleteMany()
        return c.json({
            message:"Blog posts deleted successfully"
        });
    }
    catch(e)
    {
        c.status(404);
        return c.json({
            message:"Error while deleting the post"
        });
    }
    })

    blogRouter.post('/:id/bookmark', async (c) => {
      const blogId = c.req.param("id");
      const userId = c.get("userId");
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      try {
        const bookmark = await prisma.bookmark.create({
          data: {
            userId: Number(userId),
            blogId: Number(blogId),
          },
        });
        return c.json({ message: 'Blog bookmarked successfully', bookmark });
      } catch (e) {
        c.status(500);
        return c.json({ message: 'Error bookmarking blog', error: e });
      }
    });
    
    blogRouter.get('/:blogid/bookmark',async(c)=>{
      const userid=c.get("userId");
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      try{
        const bookmark=await prisma.bookmark.findFirst({
          where:{
            userId:Number(userid),
            blogId:Number(c.req.param("blogid"))
          }
        })

        const isBookmarked = !!bookmark;

        c.status(200);
        return c.json({ isBookmarked });
        // if(bookmark)
        //   return true
        // else
        // return false
      }
      catch(e){
        c.status(500)
        return c.json({message:"Error while finding bookmarked blog", error: e})
      }
    })

    // blogRouter.get('/bookmarks', async (c) => {
    //   const userId = c.get("userId");
    //   const prisma = new PrismaClient({
    //     datasourceUrl: c.env.DATABASE_URL,
    //   }).$extends(withAccelerate());
    
    //   try {
    //     const bookmarks = await prisma.bookmark.findMany({
    //       where: {
    //         userId: Number(userId),
    //       },
    //       include: {
    //         blog: {
    //           select: {
    //             id: true,
    //             title: true,
    //             description: true,
    //             content: true,
    //             createdAt: true,
    //             author: {
    //               select: {
    //                 name: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     });
    //     return c.json({ bookmarks });
    //   } catch (e) {
    //     c.status(500);
    //     return c.json({ message: 'Error fetching bookmarks', error: e });
    //   }
    // });

    blogRouter.delete('/:id/bookmark', async (c) => {
      const blogId = c.req.param("id");
      const userId = c.get("userId");
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      try {
        // Check if the bookmark exists
        const bookmark = await prisma.bookmark.findFirst({
          where: {
            userId: Number(userId),
            blogId: Number(blogId),
          },
        });
    
        if (!bookmark) {
          c.status(404);
          return c.json({ message: 'Bookmark not found' });
        }
    
        // Delete the bookmark
        await prisma.bookmark.delete({
          where: {
            id: bookmark.id,
          },
        });
    
        return c.json({ message: 'Bookmark removed successfully' });
      } catch (e) {
        c.status(500);
        return c.json({ message: 'Error removing bookmark', error: e });
      }
    });