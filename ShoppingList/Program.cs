using ShoppingList.Controllers;
using ShoppingList.Database;

internal class Program {
    private static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.AddJsonFile("appsettings.json").Build();
        builder.Services.AddDbContext<ShoppingListDbContext>();
        builder.Services.AddTransient<ShoppingItemData>();
        builder.Services.AddTransient<AppController>();

        builder.Services.AddControllersWithViews();
        var app = builder.Build();

        var loggerFactory = app.Services.GetService<ILoggerFactory>();
        loggerFactory.AddFile(builder.Configuration["Logging:LogFilePath"].ToString());

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment()) {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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