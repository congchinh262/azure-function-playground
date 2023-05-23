import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import mongoClient from "../models";
import { BlogPost } from "../models/schema";
import connectDB from "../models";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { offset=0,limit=10 }=req.query;
    await connectDB();
    const result = await BlogPost.find({}).skip(+offset).limit(+limit);
    // const result = [];
    context.res = {
      status: 200,
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
