import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

  if (!event.context.params) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }

  let userSchema = yup.object({
    id: yup.number().required(),
    naam: yup.string().required(),
    telefoon: yup.string().required(),
    adres: yup.string().required(),
    postcode: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/),
    email: yup.string().email().required(),
    volwassenen: yup.number().required().integer().min(0),
    jongeren: yup.number().required().integer().min(0),
    babies: yup.number().required().integer().min(0),
  });

  const isValid = await userSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  if (parseInt(event.context.params.gezinId) !== body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  try {
    const results = con
      .promise()
      .execute(
        "UPDATE klanten SET naam = ?, telefoon = ?, adres = ?, postcode = ?, email = ?, volwassenen = ?, jongeren = ?, baby = ? WHERE id = ?",
        [
          body.naam,
          body.telefoon,
          body.adres,
          body.postcode,
          body.email,
          body.volwassenen,
          body.jongeren,
          body.babies,
          event.context.params.gezinId,
        ]
      );

    return results;
  } catch (error) {
    return error;
  }
});
