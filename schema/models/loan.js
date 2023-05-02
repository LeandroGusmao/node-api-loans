const shared = require("../config/shared")

module.exports = (instance, dataTypes) => {
  const schema = {
    id: {
      allowNull: false,
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    book_id: {
      allowNull: false,
      type: dataTypes.UUID,
      references: {
        model: "book",
        key: "id",
      },
  },
    start_date: {
        allowNull: false,
        type: dataTypes.DATE(3),
    },
    end_date: {
        allowNull: false,
        type: dataTypes.DATE(3),
    },
    ...shared.fields,
  }

  const model = instance.define("loan", schema, {
    ...shared.options,
  })

  return model
}
