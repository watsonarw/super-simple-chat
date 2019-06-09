export const addContentTypeIfNotDefined = (contentType) => (req, res, next) => {
    if (req.headers['content-type']) {
      req.headers['content-type'] = contentType;
    }
    next();
  }
