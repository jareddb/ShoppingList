using Microsoft.EntityFrameworkCore;
    
namespace ShoppingList.Database {
    public class ShoppingListDbContext : DbContext {

        private IConfiguration config;

        public ShoppingListDbContext(IConfiguration config) {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlite(config.GetConnectionString("ShoppingListDatabase"));
        }

        public DbSet<ShoppingListItem> ShoppingListItem { get; set; }
    }
}
