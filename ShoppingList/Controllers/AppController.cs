using Microsoft.AspNetCore.Mvc;
using ShoppingList.Database;

namespace ShoppingList.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase {

        private readonly ILogger<AppController> _logger;

        public AppController(ILogger<AppController> logger) {
            _logger = logger;
        }

        [HttpDelete("DeleteRecord/{id}")]
        public async Task<ActionResult> DeleteRecord(int id) {
            bool result = true;
            return Ok(new { data = result });
        }

        [HttpGet("AddRecord")]
        public async Task<ActionResult> AddRecord(ShoppingItem shoppingListItem) {
            bool result = true;
            return Ok(new { data = result });
        }

        [HttpGet("GetUserRecords/{username}")]
        public async Task<ActionResult> GetUserRecords(string username) {
            bool result = true;
            return Ok(new { data = result });
        }






    }
}