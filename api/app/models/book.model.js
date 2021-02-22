module.exports = mongoose => {
    const Book = mongoose.model(
      "book",
      mongoose.Schema(
        {
          title: String,
          description: String,
          author: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Book;
  };