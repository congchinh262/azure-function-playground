import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlogPost } from "../models/schema";
import connectDB from "../models";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { author, title, body } = req.body;
  try {
    if (!author || !title || !body) {
      throw new Error("Missing required fields: author, title, body");
    }
    await connectDB();
    const blogPost = await BlogPost.create({ author, title, body });
    context.res = {
      status: 200,
      body: blogPost,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
