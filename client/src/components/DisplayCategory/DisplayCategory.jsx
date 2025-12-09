import Category from "../Category/Category"

const DisplayCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category
          key={category.categoryId || index}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </>
  )
}

export default DisplayCategory