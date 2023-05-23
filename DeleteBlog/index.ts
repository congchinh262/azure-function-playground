import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import connectDB from "../models";
import { BlogPost } from "../models/schema";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id } = req.params;
  if(!id){
    throw new Error("Please provide an id");
  }
  try {
    await connectDB();
    const deletedBlog = await BlogPost.deleteOne({ _id: id });
    context.res = {
      status: 200,
      body: deletedBlog,
    };
  } catch (error) {
    context.res = {
      status: 500,
      error: error.message,
    };
  }
};

export default httpTrigger;
