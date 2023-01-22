

using Microsoft.EntityFrameworkCore;

namespace ShoppingList.Database {

    public class ShoppingItemData { 

        private ShoppingListDbContext _dbContext;
        private DbContextOptions<ShoppingListDbContext> _dbOptions;

        public ShoppingItemData(ShoppingListDbContext dbContext, DbContextOptions<ShoppingListDbContext> dbOptions) { 
            this._dbContext = dbContext;
            this._dbOptions = dbOptions;

        }

        public List<ShoppingListItem> GetAllRecords() {
            var allItems = _dbContext.ShoppingListItem.Where(i => i.IsDeleted == false).ToList();
            return allItems;
        }

        public ShoppingListItem AddBlankRecord() {
            var newItem = new ShoppingListItem() { DateAdded = DateTime.Now, Description = String.Empty, IsDeleted = false};
            _dbContext.ShoppingListItem.Add(newItem);
            _dbContext.SaveChanges();
            return newItem;
        }

        public ShoppingListItem UpsertRecord(ShoppingListItem item) {
            var itemToUpdate = _dbContext.ShoppingListItem.SingleOrDefault(x => x.Id == item.Id);
            if (itemToUpdate is null) {
                item.Id = 0;
                item.DateAdded = DateTime.Now;
                item.IsDeleted = false;
                itemToUpdate = _dbContext.ShoppingListItem.Add(item).Entity;
            }else {
                itemToUpdate.DateAdded = DateTime.Now;
                itemToUpdate.Description = item.Description;
            }
            _dbContext.SaveChanges();
            
            return itemToUpdate;
        }

        public int DeleteRecord(int id) {
            var itemToDelete = _dbContext.ShoppingListItem.Find(id);
            if (itemToDelete != null) {
                itemToDelete.IsDeleted = true;
                return _dbContext.SaveChanges();
            }
            return 0;
        }

        public int BulkUpsertRecords(List<ShoppingListItem> items) {
            var existingItems = _dbContext.ShoppingListItem.ToList();
            var newItems = items.FindAll(x => !existingItems.Any(y => y.Id == x.Id)).ToList();
            var itemsToUpdate = items.FindAll(x => existingItems.Any(y => y.Id == x.Id));
            _dbContext.ShoppingListItem.AddRange(newItems);
            _dbContext.ShoppingListItem.UpdateRange(itemsToUpdate);
            return _dbContext.SaveChanges();
        }


    }
}
