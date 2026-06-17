
export async function createCalenderEvent(
  summary: string,
  description:string,
  startTime: string,
  endTime: string,
  colorId:string
) {
  const accessToken = localStorage.getItem("googleAcessToken");
  if(!accessToken){
    throw new Error("Google access toke not found")
  }
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: summary,
        description:description,
        start: {
          dateTime: startTime,
        },
        end: {
          dateTime: endTime,
        },
        colorId:colorId
      }),
    },
  );
  return response.json();
}
