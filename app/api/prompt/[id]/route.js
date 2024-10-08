import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    //console.log(prompts);

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exsitngPrompt = await Prompt.findById(params.id);
    if (!exsitngPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    exsitngPrompt.prompt = prompt;
    exsitngPrompt.tag = tag;
    await exsitngPrompt.save();
    return new Response(JSON.stringify(exsitngPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    await Prompt.findByIdAndDelete(params.id); // Changed from prompt.remove()
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Failed to delete prompt: ${error}`, { status: 500 });
  }
};
