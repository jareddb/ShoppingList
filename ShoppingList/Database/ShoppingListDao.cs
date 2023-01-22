

using Microsoft.EntityFrameworkCore;

namespace ShoppingList.Database {

    public class ShoppingItemData {

        private readonly ILogger _logger;
        private ShoppingListDbContext _dbContext;

        public ShoppingItemData(ShoppingListDbContext dbContext, ILogger<ShoppingItemData> logger) { 
            _dbContext = dbContext;
            _logger = logger;
        }

        public List<ShoppingListItem> GetAllRecords() {
            var allItems = _dbContext.ShoppingListItem.Where(i => i.IsDeleted == false).ToList();
            _logger.LogInformation($"Retrieved {allItems.Count} items from database");
            return allItems;
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
            _logger.LogInformation($"Upserted {itemToUpdate.Id}:{itemToUpdate.Description} to database");
            return itemToUpdate;
        }

        public int DeleteRecord(int id) {
            var itemToDelete = _dbContext.ShoppingListItem.Find(id);
            if (itemToDelete != null) {
                itemToDelete.IsDeleted = true;
                _logger.LogInformation($"Deleted {itemToDelete.Id}:{itemToDelete.Description} from database");
                return _dbContext.SaveChanges();
            }
            _logger.LogInformation($"Item not found in database by id {id}, no records deleted");
            return 0;
        }

    }
}
