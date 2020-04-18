module.exports = {
  unauthorized() {
    return {
      code: "401",
      success: false,
      message: "Unauthorized",
    }
  },
  internalError(message) {
    return {
      code: "500",
      success: false,
      message: message
    }
  },
  notImplemented(message) {
    return {
      code: "501",
      success: false,
      message: `Not yet implemented:${message}`
    }
  },
  notFound(type) {
    return {
      code: "404",
      success: false,
      message: `${type} not found.`
    }
  },
  ok(type, operation, valueName, value) {
    const message = {
      code: "200",
      success: true,
      message: `${type} ${operation} successfully.`
    }
    message[valueName] = value
    return message
  },
  alreadyExists(type, value) {
    return {
      code: "422",
      success: false,
      message: `${type} '${value}' already exists.`,
    }
  },
  operationNotAllowed(message) {
    return {
      code: "405",
      success: false,
      message: `Operation not allowed: ${message}`,
    }
  },
}