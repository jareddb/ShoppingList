using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ShoppingList.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingListTests.Database {
    public class DatabaseTests {

        ShoppingItemData _shoppingItemData;

        public DatabaseTests() {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            var config = configurationBuilder.AddJsonFile("appsettings.json").Build();

            using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
                .SetMinimumLevel(LogLevel.Trace)
                .AddConsole());
            ILogger<ShoppingItemData> logger = loggerFactory.CreateLogger<ShoppingItemData>();
            _shoppingItemData = new ShoppingItemData(context, logger);

        }

        [Fact]
        public void ShouldCreateAndDeleteItem() {
            var id = ShouldCreateItem();
            ShouldDeleteItem(id);
        }


        public int ShouldCreateItem() {

            var validItem = new ShoppingListItem() {
                Id = 0,
                Description = "Test Shopping Item",
            };

            var returnedItem = _shoppingItemData.UpsertRecord(validItem);

            Assert.True(returnedItem.IsDeleted == false);
            Assert.True(returnedItem.DateAdded < DateTime.Now);
            Assert.True(returnedItem.Description == "Test Shopping Item");
            Assert.True(returnedItem.Id > 0);

            return returnedItem.Id;
        }


        public void ShouldDeleteItem(int id) {
            var deletedItems = _shoppingItemData.DeleteRecord(id);
            Assert.True(deletedItems > 0);
        }
    }
}
