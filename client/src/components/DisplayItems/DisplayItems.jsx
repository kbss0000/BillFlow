import Item from "../Item/Item"

const DisplayItems = ({ items }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Item key={item.itemId || index} item={item} />
      ))}
    </div>
  )
}

export default DisplayItems