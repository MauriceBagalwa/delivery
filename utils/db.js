const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://deleveryadmin:admin_delivery@cluster0.jdyxr.mongodb.net/delivery?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log("DB Connection Error: " + err);
  });
