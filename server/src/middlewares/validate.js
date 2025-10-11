export default function validate(schema) {
  return (req, res, next) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      return res
        .status(422)
        .json({ error: "ValidationError", details: result.error.format() });
    }
    req.validated = result.data;
    next();
  };
}
