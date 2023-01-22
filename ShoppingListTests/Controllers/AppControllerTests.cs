using ShoppingList.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingListTests.Controllers {
    internal class AppControllerTests {


        public void ShouldCreateItem() {

            //Arrange
            var validItem = new ShoppingListItem() {
                Id = 0,
                Description = "Test Shopping Item",
                DateAdded = DateTime.Now,
                IsDeleted = true
            };

            //Act

            //Assert
        }

        public void ShouldDeleteItem() {

        }
    }
}
