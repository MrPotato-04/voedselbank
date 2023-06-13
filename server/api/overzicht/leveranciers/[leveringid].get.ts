import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  if (!event.context.params) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }

  try {
    const [results, fields] = await con
      .promise()
      .execute("SELECT * FROM Leverancier where id = ?", [event.context.params.leveringId]);

    // @ts-ignore
    const _result = results[0];

    return _result;
  } catch (error) {
    return error;
  }
});