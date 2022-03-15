const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () => {
    return mongoose.connect(
      "mongodb://127.0.0.1:27017/Library"
    );
  };

  const sectionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    book_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }]
},
    {
        versionKey: false,
        timestamps: true,
    }
)


const Section = mongoose.model("section", sectionSchema)



  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    section_id: { type: mongoose.Schema.Types.ObjectId, ref: "section", required: true, },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "author" }
},
    {
        versionKey: false,
        timestamps: true,
    }
)

const Book = mongoose.model("books", bookSchema)


  const authorSchema=mongoose.Schema({
      frist_name:{type:String,required:true},
      last_name:{type:String,required:true}
  });
  const Author=mongoose.model("author",authorSchema);


  app.post("/sections", async (req, res) => {
    try {
        const section = await Section.create(req.body)
        return res.status(201).send(section)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
app.get("/sections", async (req, res) => {
    try {
        const sections = await Section.find().populate({ path: "book_ids", select: ["title"] }).lean().exec();
        return res.send(sections)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

// met + route => get /users/${variable} and the name of variable is id
app.get("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).lean().exec();

        if (section) {
            return res.send(section);
        } else {
            return res.status(404).send({ message: "Category not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// met + route => patch /users/${variable} and the name of variable is id
app.patch("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(section);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// met + route => delete /users/${variable} and the name of variable is id
app.delete("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

        res.send(section);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// ===================BOOK CRUD==============

app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body)
        return res.status(201).send(book)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find().lean().exec() //db.users.find()
        return res.send(books)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

// met + route => get /users/${variable} and the name of variable is id
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean().exec();

        if (book) {
            return res.send(book);
        } else {
            return res.status(404).send({ message: "Book not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// met + route => patch /users/${variable} and the name of variable is id
app.patch("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(book);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// met + route => delete /users/${variable} and the name of variable is id
app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        res.send(book);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// ===================AUTHOR CRUD==============

app.post("/authors", async (req, res) => {
    try {
        const author = await Author.create(req.body)
        return res.status(201).send(author)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
app.get("/authors", async (req, res) => {
    try {
        const authors = await Author.find().populate({ path: "book_ids", select: ["title"] }).lean().exec();
        // const authors = await Author.find().lean().exec() //db.users.find()
        return res.send(authors)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})



app.listen(5000, () => {
   
    console.log("listening on at port 5000");
  });