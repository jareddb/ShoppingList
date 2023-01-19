namespace ShoppingList.Database {
    public class ShoppingList {
        public int Id { get; set; }
        public string? Username { get; set; }
        public bool Complete { get; set; }
        public string? Description { get; set; }
        public bool Deleted { get; set; }

    }
}
