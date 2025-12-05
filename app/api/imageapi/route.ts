import data from "@/content/data";
export const GET = () => {
  return Response.json({
    data: data,
  });
};