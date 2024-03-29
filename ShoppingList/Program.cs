using ShoppingList.Controllers;
using ShoppingList.Database;

internal class Program {
    private static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.AddJsonFile("appsettings.json").Build();

        builder.Services.AddDbContext<ShoppingListDbContext>();
        builder.Services.AddTransient<ShoppingItemData>();
        builder.Services.AddTransient<ShoppingListController>();

        builder.Services.AddControllersWithViews();
        var app = builder.Build();

        var loggerFactory = app.Services.GetService<ILoggerFactory>();
        loggerFactory.AddFile(builder.Configuration["Logging:LogFilePath"].ToString());

        if (!app.Environment.IsDevelopment()) {
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }
}