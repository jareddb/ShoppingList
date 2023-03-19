
namespace ShoppingList.Database {
    public class ShoppingListItem {
        public int Id { get; set; }
        public DateTime? DateAdded { get; set; }
        public string? Description { get; set; }
        public bool? IsDeleted { get; set; }

    }
}
