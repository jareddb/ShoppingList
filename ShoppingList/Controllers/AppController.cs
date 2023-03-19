using Microsoft.AspNetCore.Mvc;
using ShoppingList.Database;

namespace ShoppingList.Controllers {
    [ApiController]
    [Route("[controller]/v1")]
    public class AppController : ControllerBase {

        private readonly ShoppingItemData _shoppingItemData;

        public AppController(ShoppingItemData shoppingItemData) {
            _shoppingItemData = shoppingItemData;
        }

        [HttpDelete("DeleteRecord/{id}")]
        public ActionResult DeleteRecord(int id) {
            int result = _shoppingItemData.DeleteRecord(id);
            return Ok(new { data = result });
        }

        [HttpPost("UpsertRecord")]
        public ActionResult UpsertRecord([FromBody] ShoppingListItem item) {
            var result = _shoppingItemData.UpsertRecord(item);
            return Ok(new { data = result });
        }

        [HttpGet("GetAllRecords")]
        public ActionResult GetAllRecords() {
            var result = _shoppingItemData.GetAllRecords();
            return Ok(new { data = result });
        }

    }
}
