using Microsoft.AspNetCore.Mvc;
using ShoppingList.Database;

namespace ShoppingList.Controllers {
    [ApiController]
    [Route("[controller]/v1")]
    public class AppController : ControllerBase {

        private ShoppingItemData _shoppingItemData;

        public AppController(ShoppingItemData shoppingItemData) {
            _shoppingItemData = shoppingItemData;
        }

        [HttpDelete("DeleteRecord/{id}")]
        public async Task<ActionResult> DeleteRecord(int id) {
            int result = _shoppingItemData.DeleteRecord(id);
            return Ok(new { data = result });
        }

        [HttpGet("AddRecord")]
        public async Task<ActionResult> AddRecord() {
            var result = _shoppingItemData.AddBlankRecord();
            return Ok(new { data = result });
        }

        [HttpPost("UpsertRecord")]
        public async Task<ActionResult> UpsertRecord([FromBody] ShoppingListItem item) {
            var result = _shoppingItemData.UpsertRecord(item);
            return Ok(new { data = result });
        }

        [HttpGet("GetAllRecords")]
        public async Task<ActionResult> GetAllRecords() {
            var result = _shoppingItemData.GetAllRecords();
            return Ok(new { data = result });
        }






    }
}