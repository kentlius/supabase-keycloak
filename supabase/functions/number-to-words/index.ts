import soap from "npm:soap@1.0.2";

Deno.serve(async (req) => {
  const url =
    "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl";

  // const { number } = await req.json();
  // const args = {
  //   ubiNum: number,
  // };

  const args = await req.json();

  try {
    const client = await new Promise((resolve, reject) => {
      soap.createClient(url, function (err, client) {
        if (err) reject(err);
        else resolve(client);
      });
    });

    const result = await new Promise((resolve, reject) => {
      client.NumberToWords(args, function (err, res) {
        if (err) reject(err);
        else resolve(res.NumberToWordsResult);
      });
    });

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
