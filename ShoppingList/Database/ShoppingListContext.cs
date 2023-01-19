using Microsoft.EntityFrameworkCore;
    
namespace ShoppingList.Database {
    public class ShoppingListContext : DbContext {

        private IConfiguration config;

        public ShoppingListContext(IConfiguration config) {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlite(config.GetConnectionString("ShoppingListDatabase"));
        }

        public DbSet<ShoppingList> ShoppingListItems { get; set; }
    }
}
