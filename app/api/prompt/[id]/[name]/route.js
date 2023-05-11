import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET multiple Prompts for anyuser
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to Fetch all prompts: ", error),
      {
        status: 500,
      }
    );
  }
};
