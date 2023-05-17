import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params}) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id)
    .populate('creator');
    
    if(!prompt) return new Response("Prompt not found", { status: 204 });

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch(error) {
    console.log(error);
    return new Response('We cannot search the prompt, try again', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const updatedPrompt = await Prompt.findOneAndUpdate({ _id: params.id }, { 
      prompt: prompt,
      tag: tag
    }, { new: true } );

    if (!updatedPrompt) return new Response('Prompt not found', { status: 204 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error)

    return new Response('A error ocurred while editing the prompt, try again', { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findOneAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch(error) {
    return new Response('Failed  to delete, try again', { status: 500 })
  }
}