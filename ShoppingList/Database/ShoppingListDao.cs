

namespace ShoppingList.Database {

    class ShoppingItemDao { 

        private ShoppingListContext dbContext;

        public ShoppingItemDao(ShoppingListContext dbContext) { 
            this.dbContext = dbContext;
        }

        public List<ShoppingItem> GetUserRecords(string username) {
            return dbContext.ShoppingListItems.Where(i => i.Username == username).ToList();
        }

        public int AddRecord(ShoppingItem item) {
            dbContext.ShoppingListItems.Add(item);
            return dbContext.SaveChanges();
        }

        public int DeleteRecord(int id) {
            var itemToDelete = dbContext.ShoppingListItems.Find(id);
            if (itemToDelete != null) {
                dbContext.ShoppingListItems.Remove(itemToDelete);
                return dbContext.SaveChanges();
            }
            return 0;
        }

        public int BulkUpsertUserRecords(List<ShoppingItem> items) {
            var username = items.First().Username is null ? String.Empty : items.First().Username;
            var existingItems = dbContext.ShoppingListItems.Where(x => x.Username == username);
            var newItems = items.FindAll(x => !existingItems.Any(y => y.Id == x.Id)).ToList();
            var itemsToUpdate = items.FindAll(x => existingItems.Any(y => y.Id == x.Id));

            dbContext.ShoppingListItems.AddRange(newItems);
            dbContext.ShoppingListItems.UpdateRange(itemsToUpdate);
            return dbContext.SaveChanges();
        }


    }
}
